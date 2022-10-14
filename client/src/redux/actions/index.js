import { bindActionCreators } from "redux";//investigar esto

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_TYPES = 'GET_TYPES';

export const getPokemons = ()=>{
    return async function(dispatch){
        let pokemons = await fetch('http://localhost:3001/pokemons')
            .then(data => data.json())
            .then(json => json)
            .catch(err => console.log(err));
        
        

        let detail = Promise.all(pokemons.map(async (p) =>{
            let urlToQuery;
            if(!p.url) urlToQuery ='/' + p.id;
            if(p.url) urlToQuery = p.url.split('pokemon')[1];
            return await fetch('http://localhost:3001/pokemons' + urlToQuery)
                .then(data => data.json())
                .then(json => json)
                .catch(err => console.log(err));
        })).then(data => dispatch({type: GET_POKEMONS, payload: data}));
    }
};

export const getPokemonByName = (name)=>{
    return async function(dispatch){
        await fetch(`http://localhost:3001/pokemons?name=${name}`)
            .then(data => data.json())
            .then(json => dispatch({type: GET_POKEMON_BY_NAME, payload: json}))
            .catch(err => console.log(err));
    };
};

export const getTypes = ()=>{
    return async function(dispatch){
        await fetch(`http://localhost:3001/types`)
            .then(data => data.json())
            .then(json => dispatch({type: GET_TYPES, payload: json}))
            .catch(err => console.log(err));
    };
};

