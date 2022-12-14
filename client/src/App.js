import React from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
//actions
import { getPokemons, getTypes } from './redux/actions';
//------
//componentes
import { LandingPage } from './components/LandingPage';
import { Home } from './components/Home';

//-----------


function App() {

  const dispatch = useDispatch();
  let newPokeId=10000;
  //cargo pokemons al cagar App
  useEffect(()=>{
    dispatch(getPokemons());
    dispatch(getTypes());
  },[]);

  function setId(){
    newPokeId ++;
    return newPokeId
};
  
  return (
    <div className="App">
      <Switch>
        <Route  exact path='/' component={() => <LandingPage/>}/>
        <Route  path='/home' component={()=> <Home setId={setId}/>}/>
      </Switch>
    </div>
  );
}

export default App;
