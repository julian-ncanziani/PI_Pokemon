import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';


export function Home(){

    const pokemons = useSelector(state => state.pokemons);
    const [listPokemons, setListPokemons] = useState([]);

    
    useEffect(()=>{//cuando se carguen pokenos al estado global, los copio al estado local de Home
        setListPokemons(pokemons);
    },[pokemons]);
    
    console.log(pokemons);
    
    
    return(
        <div>
            <h1>Home</h1>
            {listPokemons.length===0 ? <></> : <Cards listPokemons={listPokemons}></Cards>}
        </div>
    );
};