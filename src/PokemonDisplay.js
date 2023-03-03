import React from "react";

class PokemonDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <>
        {this.props.id ?
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.id}.png`}
            alt={`official artwork for ${this.props.name}`}
          /> 
          : null
        }
      </>

    )
  }
}

export default PokemonDisplay;