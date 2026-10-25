//node modules
import { Component } from 'react';

//dependencies
import './Card.css';
import CardStructure from './CardStructure';
import describe, { unknown } from './conditions';
import currentWeather from '../../weather';
import { removeCard, updateCard } from '../../api';

class Card extends Component {
  constructor() {
    super();

		//card's default values, shown until the weather loads
    this.state = {
      temp       : '72',
      condition  : unknown.condition,
      background : unknown.background,
      editCity   : '',
      editState  : ''
    };

    //binding functions to pass down to CardStructure
    this.deleteCard  = this.deleteCard.bind(this);
    this.editCard    = this.editCard.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateCity  = this.updateCity.bind(this);
  }

  componentDidMount() {
    this.lookUpWeather();
  }

  //an edit changes the card's city or state, so its weather has to be looked up again
  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city || prevProps.state !== this.props.state) {
      this.lookUpWeather();
    }
  }

  //gets the current weather from Open-Meteo and picks the matching background
  async lookUpWeather() {
    const { city, state } = this.props;

    try {
      const weather = await currentWeather(city, state);

      //ignores a lookup that finished after the card was edited again
      if (city !== this.props.city || state !== this.props.state) return;

      this.setState(weather ? { temp: weather.temp, ...describe(weather) } : { temp: '72', ...unknown });
    } catch (error) {
      console.error(`Couldn't get the weather for ${city}, ${state}:`, error);
    }
  }

  //deletes the current weather card
  deleteCard() {
    removeCard(this.props.id).then((cards) => this.props.updateCardsArr(cards));
  }

  //edits the current card (an empty field keeps the card's current city or state)
  editCard() {
    const { editCity, editState } = this.state;

    updateCard(this.props.id, { city: editCity, state: editState })
      .then((cards) => this.props.updateCardsArr(cards));
  }

  //captures the user's input
  updateCity  (val) { this.setState({editCity:  val}) }
  updateState (val) { this.setState({editState: val}) }

  render() {
    let { city, state, id } = this.props;
    let { temp, condition, background } = this.state;

    return (
    <div>
      <CardStructure
        //props
        id          = { id }
        city        = { city }
        state       = { state }

        //state
        temp        = { temp }
        condition   = { condition }
        background  = { background }

        //functions
        editCard    = { this.editCard }
        deleteCard  = { this.deleteCard }
        updateCity  = { this.updateCity }
        updateState = { this.updateState }
      />
    </div>
    );
  }
}

export default Card;
