import React, { useEffect, useState } from 'react';
import Stat from '../../stat/Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { calculateStatTotal, calculateHpTotal, } from '../../../../lib/calcStats';

import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../../../../reduxStore/pokeSlice';
import teamSlice from '../../../../reduxStore/teamSlice';

import EditPokemon from '../../../forms/editPokemon';

function PlaceholderStats(props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  const dispatch = useDispatch();
  let { modifyProperty, setPokemon } = pokeSlice.actions
  let { addToRoster } = teamSlice.actions

  const sortMoves = (arr) => {
    arr.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else return 0;
    })
  }

  // sorts moves on component mount
  useEffect(() => {
    let sortedMoves = [...pokeState.pokemon.moves];
    sortMoves(sortedMoves);
    dispatch(modifyProperty({
      property: 'moves', 
      value: sortedMoves
    }));
  }, [])

    return(
      <>
      <Container className='team_member_stats' >

        <div className='stats_sub_phys'>
          <Stat stat={pokeState.pokemon.stats[0]} />
          <Stat stat={pokeState.pokemon.stats[1]} />
          <Stat stat={pokeState.pokemon.stats[2]} />
        </div>

        <div className='stats_sub_spec'>
          <Stat stat={pokeState.pokemon.stats[3]} />
          <Stat stat={pokeState.pokemon.stats[4]} />
          <Stat stat={pokeState.pokemon.stats[5]} />
        </div>

        <div className='placeholder_buttons'>

          <Button
            style={{ margin: '0.5rem 0', padding: '0'}}
            onClick={() => setShowEditModal(!showEditModal)}
          >
            Edit
          </Button>

          <Button 
            style={{ margin: '0.5rem 0', padding: '0'}}
            variant='success' 
            onClick={() => dispatch(addToRoster(pokeState.pokemon))} 
          >
          + To Team
          </Button>
        </div>
      </Container>

      {showEditModal ? 
         <EditPokemon 
          showEditModal={showEditModal}
          toggleModal={() => {console.log('yo'); setShowEditModal(!showEditModal)}}  
        />
      : 
        null
      }

    </>
    )
}

export default PlaceholderStats;