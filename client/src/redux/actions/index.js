export const GET_POKEMONS = 'GET_POKEMONS';

export const getPokemons = ()=>{
    return async function(dispatch){
        let pokemons = await fetch('http://localhost:3001/pokemons')
            .then(data => data.json())
            .then(json => json)
            .catch(err => console.log(err));
        
        let detail = Promise.all(pokemons.map(async (p) =>{
            return await fetch('http://localhost:3001/pokemons' + p.url.split('pokemon')[1])
                .then(data => data.json())
                .then(json => json)
                .catch(err => console.log(err));
        })).then(data => dispatch({type: GET_POKEMONS, payload: data}));
    }
}

