import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//componentes
import { Cards } from './Cards';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';

export function Home(){

    const pokemons = useSelector(state => state.pokemons);
    const [listPokemons, setListPokemons] = useState([]);
    const [typeFilter, setTypeFilter] = useState('');

    function filterByType(){
        let arr = [];
        if(typeFilter === 'none') return arr = pokemons;
        arr = pokemons.filter(p => {
            let belongsTo = false;
            if(!p.isCreated){
                p.types.map(t=>{
                    console.log(t, typeFilter, t=== typeFilter);
                   if(t === typeFilter) belongsTo = true; 
                });
            }if(p.isCreated){
                p.types.map(t =>{
                    if(t.name === typeFilter) belongsTo =true;
                })
            }
            return belongsTo;
        })
        return arr;
    };
    
    useEffect(()=>{//cuando se carguen pokenos al estado global, los copio al estado local de Home
        setListPokemons(pokemons);
    },[pokemons]);
    
    useEffect(()=>{
        
        setListPokemons(filterByType());
    },[typeFilter]);
    console.log(pokemons);
    
    
    return(
        <div>
            <SearchBar></SearchBar>
            <FilterBar setTypeFilter={setTypeFilter}></FilterBar>
            {listPokemons.length === 0 ? <></> : <Cards listPokemons={listPokemons}></Cards>}
        </div>
    );
};