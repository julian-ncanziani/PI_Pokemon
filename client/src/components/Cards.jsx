import React from 'react';
import { Card } from './Card';
import './Cards.css';

export  function Cards({listPokemons, page}){
    return(
        <div className='cardsDiv'>
            {listPokemons[0]['error'] ? <div className='errorDiv'>Pokemon not found</div> : 
            listPokemons.map((p, index) =>{
                
                if(index > (((page - 1)* 12)-1) && index <= (page*12) - 1){
                    return <Card
                    key={index}
                    img={p.img}
                    name={p.name}
                    types={p.types}/>
                }
            })}
            
        </div>
    );
}