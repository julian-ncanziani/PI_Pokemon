import React from 'react';
import { useState } from 'react';
import './SearchBar.css';
import { getPokemonByName, getPokemons } from '../redux/actions';
import { useDispatch } from 'react-redux';


export function SearchBar({pagination, setPagination}){

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    function handleClick(){
        if(input) dispatch(getPokemonByName(input));
        if(!input) dispatch(getPokemons());
        setPagination({...pagination, page: 1});
    };

    return(
        <div className='barDiv'>
            <div>
                <button onClick={e=>handleClick()}>Buscar</button> 
                <input type="text" onChange={e=>setInput(e.target.value)}/>
            </div>
        </div>
    );
};