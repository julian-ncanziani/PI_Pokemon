import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
//componentes
import { Cards } from './Cards';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { PaginationBar } from './PaginationBar';
import { PokemonDetail } from './PokemonDetail';
import { NavBar } from './NavBar';
import { CreationForm } from './CreationForm';
import './Home.css';

export function Home({setId}){

    
    let { path, url } = useRouteMatch();
    const pokemons = useSelector(state => state.pokemons);
    const [listPokemons, setListPokemons] = useState([]);
    const [typeFilter, setTypeFilter] = useState('none');
    const [sourceFilter, setSourceFilter] = useState('none');
    const [orderBy, setOrderBy] = useState('none');
    const [pagination, setPagination] = useState({
        page: 1,
        maxPages: 0
    });

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

    function orderPokemons(array){
        if(orderBy === 'none') return array;
        if(orderBy === 'ascend') {
            return [...array].sort(function(a, b){
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
        }
        if(orderBy === 'descend'){
            return [...array].sort(function(a, b){
                if(a.name < b.name) return 1;
                if(a.name >b.name) return -1;
                return 0;
            });
        }
        if(orderBy === 'atk'){
            return[...array].sort(function(a, b){
                if(a.stats[1].value > b.stats[1].value) return -1;
                if(a.stats[1].value < b.stats[1].value) return 1;
                return 0;
            });
        }
        if(orderBy === 'defense'){
            return[...array].sort(function(a, b){
                if(a.stats[2].value > b.stats[2].value) return -1;
                if(a.stats[2].value < b.stats[2].value) return 1;
                return 0;
            });
        }
        return array;
    };
       
    function handleFilters(arr){
        arr = filterBySource(arr);
        arr = filterByType(arr);
        arr = orderPokemons(arr);
        setPagination({...pagination, page: 1});
        return arr;
    }

    useEffect(()=>{//cuando se carguen pokenos al estado global, los copio al estado local de Home
        setListPokemons(pokemons);
    },[pokemons]);

    useEffect(()=>{
        setPagination({...pagination, maxPages: Math.ceil(listPokemons.length/12)});
    },[listPokemons]);
    
    useEffect(()=>{//manejo filtros
       setListPokemons(handleFilters(pokemons));
    },[typeFilter, sourceFilter, orderBy]);
    
    
    return(
        <div className='homeDiv'>
            <Switch>
                <Route path={`${path}/creationform`}>
                    <CreationForm setId={setId}></CreationForm>
                </Route>

                <Route exact path={`${path}`}>
                    <NavBar></NavBar>
                    <SearchBar pagination={pagination} setPagination={setPagination}></SearchBar>
                    <PaginationBar pagination={pagination} setPagination={setPagination}></PaginationBar>
                    <FilterBar 
                        setTypeFilter={setTypeFilter} 
                        setSourceFilter={setSourceFilter}
                        setOrderBy={setOrderBy}></FilterBar>
                    {listPokemons.length === 0 ? <></> : 
                    <Cards page={pagination.page} listPokemons={listPokemons}></Cards>}
                </Route>

                <Route path={`${path}/detail/:id`}>
                    <NavBar></NavBar>
                    <PokemonDetail listPokemons={listPokemons}></PokemonDetail>
                </Route>
                <Route path={`${path}/form`}></Route>
            </Switch>
        </div>
    );
};