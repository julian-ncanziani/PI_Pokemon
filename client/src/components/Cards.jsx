import React from 'react';
import { Card } from './Card';
import './Cards.css';

export  function Cards({listPokemons}){
    return(
        <div className='cardsDiv'>
            {listPokemons.map((p, index) =>{
                return <Card
                key={index}
                img={p.img}
                name={p.name}
                types={p.types}/>
            })}
            
        </div>
    );
}