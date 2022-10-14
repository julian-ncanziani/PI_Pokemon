import React from 'react';
import { Card } from './Card';
import './Cards.css';

export  function Cards({listPokemons}){
    return(
        <div className='cardsDiv'>
            {listPokemons[0]['error'] ? <div className='errorDiv'>Pokemon not found</div> : 
            listPokemons.map((p, index) =>{
                return <Card
                key={index}
                img={p.img}
                name={p.name}
                types={p.types}/>
            })}
            
        </div>
    );
}