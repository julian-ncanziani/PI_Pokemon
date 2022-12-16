const { Router } = require('express');
const axios = require('axios');
const {Pokemon, Type, PokemonType} = require('../db');
const {getTypes} = require('./functions');
const {Op} = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', async (req, res)=>{
    let {name} = req.query;
    
    if(name) {
        try {
            let pokeDataBase = await Pokemon.findOne({where: {name : {[Op.like]: `%${name}%`}}, include: [{model: Type}]});
            if(pokeDataBase) return res.status(200).json(pokeDataBase);
            let pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(data => data.data);
            let pokemon = {
                id: pokemonInfo.id,
                name: pokemonInfo.name,
                img: pokemonInfo.sprites.other['official-artwork'].front_default,
                types: pokemonInfo.types.map(t => t.type.name),
                stats: pokemonInfo.stats.map((s)=>{
                    return {name: s.stat.name, value: s['base_stat']};
                }),
                height: pokemonInfo.height * 10, //altura dada en cm
                weight: pokemonInfo.weight / 10  //peso dado en kg
            }
            return res.status(200).json(pokemon);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    if(!name){
        try {
            let pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60')//puedo cambiar el limite de pokemons desde el fetch
                .then(data => data.data.results);
            let pokeDB = await Pokemon.findAll({include: [{model: Type}]});
            pokemons = [...pokeDB, ...pokemons]
            return res.status(200).json(pokemons);
        } catch (error) {
                return res.status(400).json({error: error.message});
            }
    }
});

router.get('/pokemons/:id', async (req, res)=>{
    let {id} = req.params;
    let poke = null;
    if(id >= 1000)  {//asigno valores de id mayores que mil al crear un nuevo
        poke = await Pokemon.findOne({where: {id: id}, include: [{model: Type, attributes: ['id', 'name']}]});
        if(!poke) return res.status(400).json({error: ' pokemon not found'});
        res.status(200).json(poke.dataValues);
    }else{
        try {
            let pokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => data.data);
            let pokemon = {
                id: pokemonInfo.id,
                name: pokemonInfo.name,
                img: pokemonInfo.sprites.other['official-artwork'].front_default,
                types: pokemonInfo.types.map(t => t.type.name),
                stats: pokemonInfo.stats.map((s)=>{
                    return {name: s.stat.name, value: s['base_stat']};
                }),
                height: pokemonInfo.height * 10, //altura dada en cm
                weight: pokemonInfo.weight / 10  //peso dado en kg
            }
            res.status(200).json(pokemon);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
});

router.get('/types', async (req, res)=>{
    try {
        let types = await Type.findAll();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({error: error});
    }
});

router.post('/pokemons', async (req, res)=>{
    let {id, name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    
    try {
        const newPoke = await Pokemon.create({
            id: id,
            name: name,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            img: img
        });
        await newPoke.setTypes(types);//seteo los types en la tabla intermedia
        res.status(200).json({created: 'OK'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get('/test',async (req, res)=>{
    
    try {
        let pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2')//puedo cambiar el limite de pokemons desde el fetch
                .then(data => data.data.results);
                
        let pokemonsFilteredArr = await Promise.all(pokemons.map(async (poke)=>{
            return await axios.get(poke.url)
                .then(response => response.data)
                .then(data => {
                    return {
                        id: data.id,
                        name: data.name,
                        weight: data.weight,
                        height: data.height,
                        ...data.stats.reduce((acc, stat)=> {
                            console.log('--------------');
                            console.log(acc);
                            acc[stat.stat.name] = stat.base_stat;
                            return acc;
                        },{})
                    }
                });
        }));
        res.status(200).json({conected: 'Ok',pokemons: pokemonsFilteredArr});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;
