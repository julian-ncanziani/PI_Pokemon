import React from 'react';
import { useSelector } from 'react-redux';


export function FilterBar({setTypeFilter}){

    const types = useSelector(state => state.types);

    
    

    return(
        <div className='filterBarDiv'>
            <select name="filterSelect" id="filterSelect" onChange={(e) => setTypeFilter(e.target.value)}>
                <optgroup label='By Type'>
                    <option value="none">-- Select --</option>
                    {!types ? <></> : types.map((t, index) => {
                        return <option 
                            key={index} 
                            value={t.name}>{t.name[0].toUpperCase() + t.name.slice(1)}
                            </option>
                    })}
                </optgroup>
                
                <optgroup label='By Source'>
                    <option value="api">Poke-Api</option>
                    <option value="db">Data Base</option>
                </optgroup>
            </select>
        </div>
    );
};