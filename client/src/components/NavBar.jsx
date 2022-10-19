import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

export function NavBar(){
    return(
        <div>
            <Link to='/home'> Home </Link>
            <Link to='/home/creationform'> New Pokemon </Link>
        </div>
    )
};