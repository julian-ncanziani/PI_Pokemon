/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const chai = require('chai');
var assert = require('assert');
var should = require('chai').should();
const session = require('supertest-session');
const app = require('../../src/app.js');
const chaiHttp = require('chai-http');
const { Pokemon, Type,conn } = require('../../src/db.js');
chai.use(chaiHttp);

const agent = session(app);
const pokemon = {
  name: 'Pepe',
  id:1000
};

describe(' Test /GET Pokemons', ()=>{
  it('Traigo todos los pokemons',async ()=>{
    await chai.request(app).get('/pokemons').then((data)=>{
      
      expect(data.statusCode).to.be.equal(200);
    });
  });
  
  /* 
  *Testeo buscar pokemon by name
  */
  describe('Busco pokemons by name', ()=>{
    it('-name: bulbasaur', async()=>{
      await chai.request(app).get('/pokemons?name=bulbasaur').then((data)=>{
        expect(data.body.name).to.be.equal('bulbasaur');
      });
    });

   it('-name: pikachu', async()=>{
      await chai.request(app).get('/pokemons?name=pikachu').then((data)=>{
        expect(data.body.name).to.be.equal('pikachu');
      });
    });
    it('-busco un pokemon inexistente, devuelve 400', async()=>{
      await chai.request(app).get('/pokemons?name=pepito').then((data)=>{
        expect(data.status).to.be.equal(400);
      });
    });
  });
  /* 
  *Testeo buscar pokemon by id
  */
  describe('Busco pokemons by id', ()=>{
    it('-id: 1', async()=>{
      await chai.request(app).get('/pokemons/1').then((data)=>{
        expect(data.body.name).to.be.equal('bulbasaur');
      });
    });

    it('-id: 151', async()=>{
      await chai.request(app).get('/pokemons/151').then((data)=>{
        expect(data.body.name).to.be.equal('mew');
      });
    });
    it('-id inexistente', async()=>{
      await chai.request(app).get('/pokemons/0').then((data)=>{
        expect(data.status).to.be.equal(400);
        expect(data.error).exist;
      });
    })
  });
});

describe('Test /POST Pokemons',()=>{
  before(async ()=>{
    await conn.sync({force: true}).catch(err => console.log(err));
    //await Pokemon.destroy({where : {id: 10001}}).catch(err => console.log(err));
  });
  it('devuelvo Ok si creo un pokemon', async()=>{
    let newPoke = await chai.request(app).post('/pokemons').send(
      {
        id: 10001,
        name: 'pepe',
        hp: 80,
        attack: 80,
        defense: 80,
        speed: 120,
        height: 110,
        weight: 8,
        img: 'none',
        types: []
      });
    expect(newPoke.status).to.be.equal(200);
    expect(newPoke.body).to.deep.equal({created: 'OK'});
  });

  it('-devuelve un error si creo un pokemon sin id', async()=>{
    let newPoke = await chai.request(app).post('/pokemons').send({name: 'pepe'});
    expect(newPoke.statusCode).to.be.equal(400);
    expect(newPoke.body).to.have.property('error');
  });
});
/* 
*Para esta prueba tengo que levantar la API
*/
describe('Test /GET Types', ()=>{
  it('devuelve los types de pokemons', async()=>{
    let types = await chai.request(app).get('/types');
    expect(types.statusCode).to.be.equal(200);
    expect(types.body).to.have.length(20);
  })
});
    
