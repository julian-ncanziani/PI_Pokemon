import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';

export function LandingPage(){

    const pokemons = useSelector(state => state.pokemons);
    
    return (
        <div className='landingPageDiv'>
            <span>
                <h1>Bienvenidos a PokeApp</h1>
                {pokemons.length === 0 ? <></> : <Link  to='/home'>Lets Go!</Link>}
            </span>
        </div>
    );
};
