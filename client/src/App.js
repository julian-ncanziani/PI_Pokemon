import React from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage';
import { Home } from './components/Home';
import {Route, Link, Switch} from 'react-router-dom';
import { getPokemons } from './redux/actions';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
function App() {

  const dispatch = useDispatch();

  //cargo pokemons al cagar App
  useEffect(()=>{
    dispatch(getPokemons());
  },[]);
  
  return (
    <div className="App">
      <Switch>
        <Route  exact path='/' component={() => <LandingPage/>}/>
        <Route  path='/home' component={()=> <Home/>}/>
        <Route/>
      </Switch>
    </div>
  );
}

export default App;
