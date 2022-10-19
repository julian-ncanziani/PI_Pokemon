import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";


export function NavBar(){
    return(
        <div className='navBarDiv'>
            <span>
                <img src={'https://www.freepnglogos.com/uploads/pok-mon-go-logo-png-30.png'} alt="logo" />
            </span>

            <span>
                <Link to='/home'> Home </Link>
                <Link to='/home/creationform'> New Pokemon </Link>
            </span>

        </div>
    )
};