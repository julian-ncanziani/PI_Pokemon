import React from 'react';
import './CreationForm.css';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getPokemons } from '../redux/actions';
import { Link } from 'react-router-dom';

export function CreationForm({setId}){

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const [typesForm, setTypesForm] = useState([]);
    const [name, setName] = useState('');
    const [hp, setHp] = useState('');
    const [atk, setAtk] = useState('');
    const [def, setDef] = useState('');
    const [speed, setSpeed] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [img, setImg] = useState('');
    const [errors, setErrors] = useState({
        nameErr: 'Ingrese un nombre',
        hpErr: 'Ingrese un valor',
        atkErr: 'Ingrese un valor',
        defErr: 'Ingrese un valor',
        speedErr: 'Ingrese un valor',
        heightErr: 'Ingrese un valor(m)',
        weightErr: 'Ingrese un valor(Kg)'
    });

    function addTypesSelector(value){
        if(value === 'none') return;
        let newType = typesForm.find(t => t.name === JSON.parse(value).name);
        if(!newType){
            let filter = [...typesForm, JSON.parse(value)];
            setTypesForm(filter)
            }
    };

    function deleteTypesSelector(event){
        let filter = typesForm.filter(t => t.name !== event.target.innerText);
        setTypesForm(filter);
    };

    async function handleSubmit(event){
        event.preventDefault();
        if(errors.nameErr === '' && errors.atkErr === '' && errors.defErr === '' && errors.heightErr === '' 
        && errors.hpErr === '' && errors.weightErr === '') {
                    await fetch('http://localhost:3001/pokemons', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: JSON.stringify({
                            id: setId(),
                            name: name,
                            hp: hp,
                            attack: atk,
                            defense: def,
                            speed: speed,
                            height: height,
                            weight: weight,
                            img: img,
                            types: typesForm.map(t =>  t.id)
                        })
                    }).then(res => res.json())
                    .then(json => alert(JSON.stringify(json)))
                    .catch(err => alert(err.message));
                    dispatch(getPokemons());
        }else{
            alert('Datos incorrectos');
        }
    };
    
    
    
    return(
        <div className='creationFormDiv'>
            <Link to={'/home'}>Back Home</Link>
            <h1>Create a new Pokemon</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <p>Name:</p>
                <input type="text" onChange={e => {
                    let regExp = /[0-9]/;
                    if(regExp.test(e.target.value)) setErrors({...errors, nameErr: 'El nombre no puede tener caracteres numericos'});
                    else if(!e.target.value) setErrors({...errors, nameErr: 'Ingrese un nombre'});
                    else setErrors({...errors, nameErr: ''});
                    setName(e.target.value);
                }}/>
                {!errors.nameErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.nameErr}</label>}

                <p>Hp:</p>
                <input type="number" onChange={e => {
                    if(parseInt(e.target.value) <= 0) setErrors({...errors, hpErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, hpErr: ''});
                    setHp(parseInt(e.target.value));
                }}/>
                {!errors.hpErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.hpErr}</label>}

                <p>Atk:</p>
                <input type="number" onChange={e => {
                    if(parseInt(e.target.value) <= 0) setErrors({...errors, atkErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, atkErr: ''});
                    setAtk(parseInt(e.target.value));
                }}/>
                {!errors.atkErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.atkErr}</label>}

                <p>Def:</p>
                <input type="number" onChange={e => {
                    if(parseInt(e.target.value) <= 0) setErrors({...errors, defErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, defErr: ''});
                    setDef(parseInt(e.target.value));
                }}/>
                {!errors.defErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.defErr}</label>}

                <p>Speed:</p>
                <input type="number" onChange={e => {
                    if(parseInt(e.target.value) <= 0) setErrors({...errors, speedErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, speedErr: ''});
                    setSpeed(parseInt(e.target.value));
                }} />
                {!errors.speedErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.speedErr}</label>}

                <p>Height (m):</p>
                <input type="number" onChange={e => {
                    if(parseFloat(e.target.value) <= 0) setErrors({...errors, heightErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, heightErr: ''});
                    setHeight(e.target.value);
                }}/>
                {!errors.heightErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.heightErr}</label>}

                <p>Weight (kg):</p>
                <input type="number" onChange={e => {
                    if(parseFloat(e.target.value) <= 0) setErrors({...errors, weightErr: 'Solo valores mayores que 0 son validos'});
                    else setErrors({...errors, weightErr: ''});
                    setWeight(e.target.value);
                }}/>
                {!errors.weightErr ? <label className='validLabel'>Campo Valido</label> : <label>{errors.weightErr}</label>}

                <p>Img (url):</p>
                <input type="text" />

                <p>Types</p>
                <select 
                    name="pokeType" 
                    id="pokeType" 
                    onChange={e => addTypesSelector(e.target.value)}>
                        <option value='none'>-- Select --</option>
                    {types.map( (t, index) => <option 
                        value={JSON.stringify(t)} 
                        key={index}>{t.name}</option>)}
                </select>
                <span>
                    <ul>
                        {typesForm.map((t,index) => <li 
                            onClick={e => deleteTypesSelector(e)} 
                            key={index}
                            value={t.name}>{t.name}</li>)}
                    </ul>
                </span>
                <button type="submit" value={'Submit'}  onClick={e => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}