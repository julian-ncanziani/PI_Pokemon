import React from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';

export function PokemonDetail({listPokemons}){
    let {id} = useParams();
    let pokemon = listPokemons.find(p => p['id'] == id);
    console.log(pokemon);

    return(
        <div className='detailDiv'>
            {!pokemon ? <></> :
            [
                <span>
                    <img src={pokemon.img} alt="" />
                </span>,
                <span>
                    <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>,
                    <ul>
                        <h3>Stats:</h3>
                        <li>-<h6>Height(cm):</h6>{pokemon.height}</li>
                        <li>-<h6>Weight(kg):</h6> {pokemon.weight}</li>
                        <li>-<h6>Hp:</h6> {pokemon.stats[0].value}</li>
                        <li>-<h6>Atk:</h6> {pokemon.stats[1].value}</li>
                        <li>-<h6>Def:</h6> {pokemon.stats[2].value}</li>
                        <li>-<h6>Speed:</h6> {pokemon.stats[5].value}</li>
                    </ul>
                    <p>Type: </p>
                    {pokemon.types.map((t, index) => <label className={`${t}Label`}>{t.toUpperCase()} </label>)}
                </span>
            ]}
            
        </div>
    )
};