import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBullhorn, faCirclePlay, faExclamation, faMusic, faPlay} from '@fortawesome/free-solid-svg-icons'

// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "./right/RightCard";
import PokemonDisplay from "./left/Display";
import BaseStats from "./left/BaseStats";
//redux
import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "../../reduxStore/pokeSlice";
import dexSlice from "../../reduxStore/dexSlice";


function Pokedex (props) {
  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex)
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { toggleShiny, changeFormIdx, setPokemon } = pokeSlice.actions
  const { toggleIsLoading } = dexSlice.actions;

  const pleaseSearchAlert = () => {
    alert('Please search for a pokemon first')
  }

  const playAudio = () => {
    if (pokeState.pokemon?.name){
      let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokeState.pokemon.name.toLowerCase()}.mp3`);
      audio.volume = 0.1;
      audio.play();      
    } else {
      pleaseSearchAlert();
    }

  }

  const handleToggleShiny = () => {
    if(pokeState.pokemon?.name){
      dispatch(toggleShiny(!pokeState.showShiny))      
    } else {
      pleaseSearchAlert();
    }
  }

  const handleToggleForm = async () => {
    if(pokeState.pokemon?.name){

      let newApiIdx = pokeState.formIdx + 1;
      if (newApiIdx >= pokeState.pokemon.forms.length) {
        newApiIdx = 0;
      }

      try{
        dispatch(toggleIsLoading(true));
        let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/form/${pokeState.pokemon.forms[newApiIdx].name}`);
        dispatch(changeFormIdx(newApiIdx));
        dispatch(setPokemon(foundPokemon.data.pokemon))
        dispatch(toggleIsLoading(false));
      }
      catch(e){
        console.error(e)
        dispatch(toggleIsLoading(false));
      }
     
    } else {
      pleaseSearchAlert();
    }
  }

  const handleSearch = async (event, id) => {
    event.preventDefault();
    dispatch(toggleIsLoading(true));
    let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/${id}`);
    dispatch(setPokemon(foundPokemon.data.pokemon))
    dispatch(toggleIsLoading(false));
  }

  const handleAdjacentPokemon = (event, int) => {
    dispatch(changeFormIdx(0));
    if (pokeState.pokemon?.name) {
      handleSearch(event, pokeState.pokemon.id + int)
    } else {
      handleSearch(event, 1)
    }
  }

  const handleNextGen = (event) => {
    // if a search has been made and returned a result, then cycle up by generations
    if (pokeState.pokemon?.name) {
    // if you're viewing pokemon within gen 1, move to gen 2
      if (pokeState.pokemon.id <= 151) {
        handleSearch(event, 152)
    // if you're viewing pokemon within gen 2, move to gen 3 & etc.
      } else if (pokeState.pokemon.id <= 251) {
        handleSearch(event, 252)
      } else if (pokeState.pokemon.id <= 386) {
        handleSearch(event, 387)
      } else if (pokeState.pokemon.id <= 493) {
        handleSearch(event, 495)
      } else if (pokeState.pokemon.id <= 649) {
        handleSearch(event, 650)
      } else if (pokeState.pokemon.id <= 721) {
        handleSearch(event, 722)
      } else if (pokeState.pokemon.id <= 809) {
        handleSearch(event, 810)
      } else if (pokeState.pokemon.id <= 905) {
        handleSearch(event, 906)
      } else if (pokeState.pokemon.id <= 906) {
        handleSearch(event, 1)
      }
    } else {handleSearch(event, 1)}
  }

  const handlePreviousGen = (event) => {
    // if a search has been made and returned a result, cycle back by generations
    if (pokeState.pokemon) {
      // if within gen 9, move back to first starter of gen 8
      if (pokeState.pokemon.id >= 906) {
        handleSearch(event, 810)
      } else if (pokeState.pokemon.id >= 810) {
        handleSearch(event, 722)
      } else if (pokeState.pokemon.id >= 722) {
        handleSearch(event, 650)
      } else if (pokeState.pokemon.id >= 650) {
        handleSearch(event, 495)
      } else if (pokeState.pokemon.id >= 494) {
        handleSearch(event, 387)
      } else if (pokeState.pokemon.id >= 387) {
        handleSearch(event, 252)
      } else if (pokeState.pokemon.id >= 252) {
        handleSearch(event, 152)
      } else if (pokeState.pokemon.id >= 152) {
        handleSearch(event, 1)
      } else if (pokeState.pokemon.id >= 1) {
        handleSearch(event, 906)
      }
    // if no search has been made, move to gen 9
    } else {
      handleSearch(event, 906)
    }
  }

  return (
    <div id='left-card'>   
      
    </div>
  )
}

export default LeftCard;