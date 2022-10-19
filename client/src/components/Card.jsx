import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

export function Card({img, name, types, id}){
    return(
        <div className='cardDiv'>
            {<img src={img} alt="img" />}
            {!name ? <></> : <h2><Link to={`/home/detail/${id}`}>{name[0].toUpperCase() + name.slice(1)}</Link></h2>}
            <span>
                {!types ? <></> : 
                    types.map((t, index) =>{
                        return<label key={index} className={`${t}Label`}>{t.toUpperCase()}</label>
                })}
            </span>
        </div>
    );
};