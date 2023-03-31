import React from "react";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "../RightCard";
import PokemonDisplay from "./PokemonDisplay";
import BaseStats from "./BaseStats";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: this.props.searchResult
    }
  }

  componentDidMount() {
    this.setState({
      searchResult: this.props.searchResult
    })
  }

  render() {
    return (
      <Container id='pokedex-container'>
        
        <CardGroup id='pokedex' >

          {/* left side card */}
          <Card bg='danger'>
            <Card.Header>
              {/* pokedex lights */}
              <div id="light-container">
                <div id="blue-light"></div>
                <div id="red-light"></div>
                <div id="yellow-light"></div>
                <div id="green-light"></div>
              </div>
            </Card.Header>

            <Card.Body>
              {/* displays pokemon picture */}
              <Container id='pokedex-display-border'>
                <Container id='pokedex-display'>
                  {this.props.searchResult ?
                    <PokemonDisplay 
                      name={this.props.searchResult.name}
                      id={this.props.searchResult.id} 
                      sprites={this.props.searchResult.sprites} 
                      key={`${this.props.searchResult.name}_display`} 
                    /> 
                    : null
                  }
                </Container>
              </Container>

                {/*green box that displays pokemon stats */}
              <Container id='pokedex-bottom-ui'>
                
                <Container id='bottom-ui-circlebutton'>
                  <Container id='circlebutton'></Container>
                </Container>

                <Container id='bottom-ui-center'>

                  <Container id='bottom-ui-red-blue'>
                    <Button></Button>
                    <Button></Button>
                  </Container>

                  <Container id='bottom-ui-pokedex-info'>
                    {/* displays pokemon name
                    {this.props.searchResult ? 
                      <h4>
                        {this.props.searchResult.name[0].toUpperCase() + 
                        this.props.searchResult.name.slice(1)}
                      </h4> 
                      : 
                      <h4>missingName</h4>
                    } */}
                    {/* displays pokemon base stats */}
                    {this.props.searchResult ? 
                      <BaseStats 
                        stats={this.props.searchResult.stats} 
                        key={`${this.props.searchResult.name}_basestats`}
                      />
                      :
                      <BaseStats
                        stats={
                          [
                            {name: 'HP', base_stat: undefined},
                            {name: 'ATK', base_stat: undefined},
                            {name: 'DEF', base_stat: undefined},
                            {name: 'SP.ATK', base_stat: undefined},
                            {name: 'SP.DEF', base_stat: undefined},
                            {name: 'SPD', base_stat: undefined}
                          ]
                        }
                        key={`placeholder_basestats`}
                      />
                    }
                  </Container>     

                </Container>



                <Container id='bottom-ui-dpad'>
                    <div id='dpad-up'></div>
                    <div id='dpad-left' onClick={this.props.handlePreviousPokemon}></div>
                    <div id='dpad-center'></div>
                    <div id='dpad-right' onClick={this.props.handleNextPokemon}></div>
                    <div id='dpad-down'></div>
                </Container>

              </Container>
            </Card.Body>
          </Card>
          
          {/* right side card */}
          <RightCard searchResult={this.props.searchResult}/>

        </CardGroup>
      </Container>
      
    )
  }
}

export default Pokedex;