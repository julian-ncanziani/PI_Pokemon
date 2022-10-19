import React from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';

export function PokemonDetail({listPokemons}){
    let {id} = useParams();
    let pokemon = listPokemons.find(p => p['id'] == id);
    console.log(pokemon);

    return(
        <div>
            {!pokemon ? <></> :
            [<h2>{pokemon.name}</h2>,
            <img src={pokemon.img} alt="" />,
            <ul>Stats:
                <li>height: {pokemon.height}</li>
                <li>weight: {pokemon.weight}</li>
                <li>Hp: {pokemon.stats[0].value}</li>
                <li>Atk: {pokemon.stats[1].value}</li>
                <li>Def: {pokemon.stats[2].value}</li>
                <li>Speed: {pokemon.stats[5].value}</li>
            </ul>]}
            {pokemon.types.map((t, index) => {
                if(!t.name) return <span key={index}> {t} </span>;
                else return <span key={index}> {t.name} </span>
                })}
        </div>
    )
};