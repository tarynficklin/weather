//node modules
import { Component } from 'react';

//dependencies
import Card          from './cards/Card';
import AddButton     from './inputs/AddButton';
import CitySelector  from './inputs/CitySelector';
import StateSelector from './inputs/StateSelector';
import { addCard, getCards } from '../api';
import './Weather.css';

class Weather extends Component {
  constructor() {
    super();

    //the default value for the cards when created
    this.state = {
      city     : 'provo',
      state    : 'ut',
      cardsArr : [],
    };

    //binds the methods to pass down to Card.js
    this.add            = this.add.bind(this);
    this.getCity        = this.getCity.bind(this);
    this.getState       = this.getState.bind(this);
    this.updateCardsArr = this.updateCardsArr.bind(this);
  }

  componentDidMount() {
    //gets data from local server
    getCards().then(cards => this.setState({cardsArr: cards}))
  }

  //captures the user's input for adding a new card
  getCity        (val) {this.setState({city     : val})}
  getState       (val) {this.setState({state    : val})}
  updateCardsArr (val) {this.setState({cardsArr : val})}

  //creates a new card
  add() {
    addCard({
      city  : this.state.city,
      state : this.state.state
    })
      .then(cards => this.setState({cardsArr: cards}))
  }

  render() {
    const { cardsArr } = this.state;

    return (
      <div>
        <div className="input-bar">
          <CitySelector getCity = { this.getCity } />
          <StateSelector getState = { this.getState } />
          <AddButton add = { this.add } />
        </div>

        <div className="card-field">
          {/* keyed by id, so deleting a card doesn't hand its weather to the next one */}
          {cardsArr.map((e) => {
            return (
              <Card
                key   = { e.id }
                id    = { e.id }
                city  = { e.city }
                state = { e.state }
                updateCardsArr = { this.updateCardsArr }
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default Weather;
