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
    const [typeFilter, setTypeFilter] = useState('none');
    const [sourceFilter, setSourceFilter] = useState('none');
    const [orderBy, setOrderBy] = useState('none');

    function filterByType(array){
        let arrFilter = [];
        if(typeFilter === 'none') return arrFilter = array;
        arrFilter = array.filter(p => {
            let belongsTo = false;
            if(!p.isCreated){
                p.types.map(t=>{
                    //console.log(t, typeFilter, t=== typeFilter);
                   if(t === typeFilter) belongsTo = true; 
                });
            }if(p.isCreated){
                p.types.map(t =>{
                    if(t.name === typeFilter) belongsTo =true;
                })
            }
            return belongsTo;
        })
        return arrFilter;
    };
    
    function filterBySource(array){
        if(sourceFilter === 'none') return array;
        let arrFilter = array.filter(p =>{
            if(sourceFilter === 'db' && p.isCreated) return true;
            if(sourceFilter === 'api' && !p.isCreated) return true;
        });
        return arrFilter;
    };

    function handleFilters(){
        let arr = pokemons;
        arr = filterBySource(arr);
        arr = filterByType(arr);
        return arr;
    }

    useEffect(()=>{//cuando se carguen pokenos al estado global, los copio al estado local de Home
        setListPokemons(pokemons);
    },[pokemons]);
    
    useEffect(()=>{//manejo filtros
        setListPokemons(handleFilters());
    },[typeFilter, sourceFilter, orderBy]);
    
    console.log(pokemons);
    
    return(
        <div>
            <SearchBar></SearchBar>
            <FilterBar 
                setTypeFilter={setTypeFilter} 
                setSourceFilter={setSourceFilter}
                setOrderBy={setOrderBy}></FilterBar>
            {listPokemons.length === 0 ? <></> : <Cards listPokemons={listPokemons}></Cards>}
        </div>
    );
};