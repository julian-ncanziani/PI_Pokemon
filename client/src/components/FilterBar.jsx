import React from 'react';
import { useSelector } from 'react-redux';


export function FilterBar({setTypeFilter, setSourceFilter, setOrderBy}){

    const types = useSelector(state => state.types);

    return(
        <div className='filterBarDiv'>
            Types: <select name="filterSelect" id="filterSelect" onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="none">-- Select --</option>
                    {!types ? <></> : types.map((t, index) => {
                        return <option 
                            key={index} 
                            value={t.name}>{t.name[0].toUpperCase() + t.name.slice(1)}
                            </option>
                    })}
            </select>

            Source: <select name="sourceFilter" id="sourceFilter" onChange={e => setSourceFilter(e.target.value)}>
                    <option value="none">-- Select --</option>
                    <option value="api">Poke-Api</option>
                    <option value="db">Data Base</option>
            </select>

            Order <select name="orderBy" id="orderBy" onChange={e => setOrderBy(e.target.value)}>
                <option value="none">-- Select --</option>
                <optgroup label='Stats'>
                    <option value="atk">Attack</option>
                </optgroup>
                <optgroup label='Name'>
                    <option value="descend">Descend</option>
                    <option value="ascend">Ascend</option>
                </optgroup>
            </select>
        </div>
    );
};