import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Move {
  constructor(
    name=undefined, 
    levelLearned=undefined, 
    power=undefined, 
    accuracy=undefined, 
    pp=undefined, 
    dmgClass=undefined, 
    type=undefined
    ){
    this.name = name;
    this.levelLearned = levelLearned;
    this.power = power;
    this.accuracy = accuracy;
    this.pp = pp;
    this.dmgClass = dmgClass;
    this.type = type;
  }
}

class MoveList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // levelUpMoves: {
      //   all: [],
      //   red_blue: [],
      //   yellow: [],
      //   gold_silver: [],
      //   crystal: [],
      //   ruby_sapphire: [],
      //   fireRed_leafGreen: [],
      //   emerald: [],
      //   diamond_pearl: [],
      //   platinum: [],
      //   heartGold_soulSilver: [],
      //   black_white: [],
      //   black_white_2: [],
      //   x_y: [],
      //   omegaRuby_alphaSapphire: [],
      //   sun_moon: [],
      //   ultra_sun_moon: [],
      //   lets_go: [],
      //   sword_shield: [],
      //   scarlet_violet: [],
      // },
      levelUpMoves: [],
      tmMoves: [],
      tutorMoves: [],
      allMoves: undefined,
      moves: this.props.moves,
      sortedByLevel: true,
      sortedByName: false,
    }
  }

  // makeMoveDataAPICall = async(moveName) => {
  //   let moveData;
  //   try {
  //     let request = {
  //       url: `https://pokeapi.co/api/v2/move/${moveName}`,
  //       method: 'GET'
  //     }
  
  //     let response = await axios(request);

  //     moveData = new Move(response.data.name);
  //   } catch {
  //     console.log('error getting move info')
  //   }
  //   console.log(moveData);
  //   return moveData;
  // }

  // getMoveData = (arr) => {
  //   let moveData = this.makeMoveDataAPICall(arr[0].name);

  //   console.log(moveData);

  //   let updatedMove = new Move(moveData.name, arr[0].levelLearned, moveData.power, moveData.accuracy, moveData.pp, moveData.dmgClass, moveData.type)

  //   console.log(updatedMove);
  // }

  // setFilteredMovesToState = (arr) => {
  //   let dupeArr = [];

  //   arr.forEach(element => {
  //     dupeArr.push(new Move(element.move.name, element.version_group_details[0].level_learned_at))
  //   })

  //   this.getMoveData(dupeArr);
  

  //   this.setState({
  //     allMoves: dupeArr
  //   })
  // }

  filterDuplicateMoves = (arr) => {
    let filteredArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i + 1]){
        
      }
      else if (arr[i].name !== arr[i + 1].name) {
        filteredArr = [arr[i], ...filteredArr];
      }
    }
    return filteredArr;
  }

  sortMovesByLevel = (arr) => {
    arr.sort((a,b) => {
      if(a.levelLearned < b.levelLearned){
        return -1;
      } else if (a.levelLearned > b.levelLearned) {
        return 1;
      } else return 0;
    })
  }

  handleToggleLevelSort = () => {
    if (this.state.sortedByLevel) {
      this.setState({
        sortedByLevel: true,
        sortedByName: false,
        levelUpMoves: this.state.levelUpMoves.reverse(),
      })
    } else {
      let sortedMoves = [...this.state.levelUpMoves];
      this.sortMovesByLevel(sortedMoves);
      this.setState({
        sortedByLevel: true,
        sortedByName: false,
        levelUpMoves: sortedMoves
      })
    }
  }

  sortMovesByName = (arr) => {
    arr.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else return 0;
    })
  }

  handleToggleNameSort = () => {

    if (this.state.sortedByName) {
      this.setState({
        sortedByName: true,
        sortedByLevel: false,
        levelUpMoves: this.state.levelUpMoves.reverse(),
        tmMoves: this.state.tmMoves.reverse(),
        tutorMoves: this.state.tutorMoves.reverse()
      })
    } else {
      let newLevelUpMoves = [...this.state.levelUpMoves];
      let newTmMoves = [...this.state.tmMoves];
      let newTutorMoves = [...this.state.tutorMoves];

      this.sortMovesByName(newLevelUpMoves);
      this.sortMovesByName(newTmMoves);
      this.sortMovesByName(newTutorMoves);

      this.setState({
        sortedByLevel: false,
        sortedByName: true,
        levelUpMoves: newLevelUpMoves,
        tmMoves: newTmMoves,
        tutorMoves: newTutorMoves
      })
    }
  }

  parseLevelUpMoves = () => {
    let levelUpArr = [];

    this.props.moves.forEach(element => (

      element.version_group_details.forEach(item => {
        if (item.move_learn_method.name === 'level-up') {
          levelUpArr.push((new Move(element.move.name, item.level_learned_at)));
        };
      })
    ))

    let newArr = (this.filterDuplicateMoves(levelUpArr));

    this.sortMovesByLevel(newArr);

    this.setState({levelUpMoves: newArr})
  }

  parseTmMoves = () => {
    let tmArr = [];

    this.props.moves.forEach(element => (

      element.version_group_details.forEach(item => {
        if (item.move_learn_method.name === 'machine') {
          tmArr.push((new Move(element.move.name, item.level_learned_at)));
        };
      })
    ))

    let newArr = (this.filterDuplicateMoves(tmArr));

    this.sortMovesByName(newArr);

    this.setState({tmMoves: newArr})
  }

  parseTutorMoves = () => {
    let tutorArr = [];

    this.props.moves.forEach(element => (

      element.version_group_details.forEach(item => {
        if (item.move_learn_method.name === 'tutor') {
          tutorArr.push((new Move(element.move.name, item.level_learned_at)));
        };
      })
    ))

    let newArr = (this.filterDuplicateMoves(tutorArr));

    this.sortMovesByName(newArr);

    this.setState({tutorMoves: newArr})
  }

  componentDidMount() {
    this.setFilteredMovesToState(this.props.moves)
    this.parseLevelUpMoves();
    this.parseTmMoves();
    this.parseTutorMoves();
  }

  render(){
    return(
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Level-Up</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.props.moves.length > 0 ?
                 this.props.moves.map(element => (
                  <tr>
                    <td>{element.version_group_details[0].level_learned_at}</td>
                    <td>{element.move.name}</td>
                  </tr>
                 ))
                 : null } */}

                 {this.state.levelUpMoves.length > 0 ?
                 this.state.levelUpMoves.map(element => (
                  <tr>
                    <td>{element.levelLearned}</td>
                    <td>{element.name}</td>
                  </tr>
                 ))
                 : null }
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>TM Moves</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.tmMoves.length > 0 ?
                 this.state.tmMoves.map(element => (
                  <tr>
                    <td>{element.levelLearned}</td>
                    <td>{element.name}</td>
                  </tr>
                 ))
                 : null }
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Tutor Moves</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.tutorMoves.length > 0 ?
                 this.state.tutorMoves.map(element => (
                  <tr>
                    <td>{element.levelLearned}</td>
                    <td>{element.name}</td>
                  </tr>
                 ))
                 : null }
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  }
}

export default MoveList;