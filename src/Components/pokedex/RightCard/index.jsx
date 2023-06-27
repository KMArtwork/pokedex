import React, { useState } from "react";

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";

import Learnset from "../../moves/LearnSet";
import Container from 'react-bootstrap/Container';
import Abilities from "../../abilities/AbilitiesList";
import Team from "../../teambuilder/roster/Team";
import PokedexMainRight from "../RightMain"
import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../reduxStore/teamSlice";
import TeamTypeChart from "../../teambuilder/roster/TypeChart";
import { fetchTeamsFromServer } from "../../../reduxStore/helperFuncs";
import LoadedTeams from "../../teambuilder/modals/LoadedTeam";
import SaveTeamModal from "../../teambuilder/modals/SaveTeam";

function RightCard (props){
  const [activeKey, setActiveKey] = useState(0);
  const [showSaveTeamModal, setShowSaveTeamModal] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();

  const { toggleTypeChart, setFetchedTeams, clearRoster, toggleLoadedTeams, toggleSaveTeam } = teamSlice.actions;

  // handles changing the activeKey state property
  const changeTab = (tabIndex) => {
    setActiveKey(tabIndex)
  }

  const loadTeams = () => {
    dispatch(fetchTeamsFromServer())
    .then(response => {
      dispatch(setFetchedTeams(response.data))      
    })
    .then(dispatch(toggleLoadedTeams()))
    .catch(err => console.error(err))
  }

  const toggleSaveTeamModal = () => {
    dispatch(fetchTeamsFromServer())
    .then(response => {
      dispatch(setFetchedTeams(response.data))
    })
    .then(dispatch(toggleSaveTeam()))
    .catch(err => console.error(err))
  }

  // const saveTeam = (event) => {
  //   event.preventDefault();

  //   if(userState.username){
  //     dispatch(saveTeamToServer(teamState.teamName, teamState.roster, teamState.id, userState.username))
  //     .then(response => console.log('Team Saved', response))
  //     .catch(error => console.error('Unable to save team', error))      
  //   } else {
  //     alert('User must be logged in to save a team')
  //     console.error('User must be logged in to save a team');
  //   }
  // }
  
    return(
      <>
      <Card bg='danger' style={{justifyContent: 'space-evenly'}}>    
      
        {/* tabs for different functionality of the pokedex */}
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey='0'>
            <Nav.Item>
              <Nav.Link eventKey='0' onClick={() => {changeTab(0)}}>Main</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='1' onClick={() => {changeTab(1)}}>Team Builder</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='2' onClick={() => {changeTab(2)}}>Items</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header> 
        
        <Card.Body id="right_card_body">
          {activeKey === 0 ?
          // if activeKey is 0, display a 'default' pokedex layout
            <PokedexMainRight />
          :   
            false
          }

          {
            activeKey === 1 ?
            // if activeKey is 2, displays team builder
              <Team showSaveTeamModal={showSaveTeamModal} setShowSaveTeamModal={setShowSaveTeamModal} />
            : 
              null
          }

        </Card.Body>

        <Card.Footer>
          {activeKey === 1 ? 
            <Container style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <Button size='sm' onClick={() => dispatch(toggleTypeChart())}>
                Type Coverage
              </Button>
              <Button size='sm' onClick={() => dispatch(clearRoster())}>
                New Team
              </Button>
              <Button size='sm' onClick={toggleSaveTeamModal}>
                Save Team
              </Button>
              <Button size='sm' onClick={loadTeams}>
                Load Team
              </Button>         
            </Container>
          :
            <Button style={{visibility: 'hidden'}} size="sm">Just Here For Footer Consistency</Button>
          }
        </Card.Footer>
    </Card>

    {teamState.showTypeChart ? <TeamTypeChart /> : null}
    {teamState.showLoadedTeams ? <LoadedTeams /> : null}
    {teamState.showSaveTeam ? <SaveTeamModal /> : null}  
    </>
    
    )
}

export default RightCard;