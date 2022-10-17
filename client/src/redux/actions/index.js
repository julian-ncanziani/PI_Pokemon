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
        })).then(data => {
            let normArr = data.map(p =>{
                if(p.isCreated){
                    let normalizeInfo = {
                        id:p.id,
                        height: p.height,
                        img: p.img,
                        name: p.name,
                        stats: [
                            {name: 'hp', value: p.hp}, 
                            {name: 'attack', value: p.attack},
                            {name: 'defense', value: p.defense},
                            {name: 'special-attack', value: 0},
                            {name: 'special-defense', value: 0},
                            {name: 'speed', value: p.speed}],
                        types: p.types,
                        weight: p.weight,
                        isCreated: p.isCreated
                    }
                    return normalizeInfo;
                }else{
                    return p
                }
            });
            dispatch({type: GET_POKEMONS, payload: normArr})});
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

