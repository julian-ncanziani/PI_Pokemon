import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function LandingPage(){

    const pokemons = useSelector(state => state.pokemons);
    
    return (
        <div>
            {pokemons.length === 0 ? <></> : <Link to='/home'>Lets Go!</Link>}
        </div>
    );
};
