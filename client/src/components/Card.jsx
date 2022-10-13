import React from 'react';
import './Card.css';

export function Card({img, name, types}){
    return(
        <div className='cardDiv'>
            <img src={img} alt="img" />
            <h2>{name}</h2>
            {types.map((t, index) =>{
                return <span key={index}>{t}</span>
            })}
        </div>
    );
};