import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import sprites from '../../../../lib/sprites';

function PokemonDisplay (props){
  const pokeState = useSelector(state => state.pokemon)
  const dexState = useSelector(state => state.pokedex);

  const [missingSprites, setMissingSprites] = useState(null);

  const getMissingSprites = () => {
    if (sprites[pokeState.pokemon.name]) {
      setMissingSprites(sprites[pokeState.pokemon.name])
    } else {
      setMissingSprites(null)
    }
  }

  useEffect(() => {
    getMissingSprites();
  }, 
  // eslint-disable-next-line
  [])


  return(
    
    <>
      {
        !dexState.isLoading ? 
          missingSprites ? 
            pokeState.formIdx === 0 ? 
              pokeState.showShiny ? 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`}
                alt={`official shiny artwork for ${pokeState.pokemon.name}`}
                /> 
              : 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`}
                alt={`official artwork for ${pokeState.pokemon.name}`}
                /> 
            : 
              pokeState.showShiny ? 
                <img
                src={missingSprites[pokeState.formIdx - 1]}
                alt="placeholder description"
                /> 
              : 
                <img
                src={missingSprites[pokeState.formIdx - 1]}
                alt="placeholder description"
                /> 
          : 
            pokeState.showShiny ? 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`}
              alt={`official shiny artwork for ${pokeState.pokemon.name}`}
              /> 
            : 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`}
              alt={`official artwork for ${pokeState.pokemon.name}`}
              /> 
        : 
        <>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>

          
      }
    </>
  )
}

export default PokemonDisplay;