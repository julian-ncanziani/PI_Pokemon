import React from 'react';
import './Card.css';

export function Card({img, name, types}){
    return(
        <div className='cardDiv'>
            {<img src={img} alt="img" />}
            {!name ? <></> : <h2>{name[0].toUpperCase() + name.slice(1)}</h2>}
            <span>
                {!types ? <></> : 
                    types.map((t, index) =>{
                    if(t.name) return <label key={index}>{t.name.toUpperCase()}</label>
                    else{
                        return <label key={index}>{t.toUpperCase()}</label>
                    }
                })}
            </span>
        </div>
    );
};