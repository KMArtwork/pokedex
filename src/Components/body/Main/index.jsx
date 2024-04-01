// dependencies
import React from "react";
// bootstrap components
import Container from "react-bootstrap/Container";
// my components & classes
import SearchBar from "../SearchBar";
import Pokedex from "../../pokedex";



function Main (props){
  
    return(
      <div id='main-container'>
        <SearchBar />
        <Pokedex />
      </div>
    )
}

export default Main;