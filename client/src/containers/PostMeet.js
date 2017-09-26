import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './PostMeet.css';

class PostMeet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      blockClass: 'block_hidden'
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleBlock = this.toggleBlock.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const about = e.target.about.value;
    const location = e.target.location.value;
    const date = e.target.date.value;
    const food = e.target.food.checked;
    let food_types = [];
    if (food) {
      e.target.food__preferences.forEach( type => {
        if (type.checked) food_types.push(type.value);
      })
    }
    axios
      .post('/api/meet/new', { about, location, date, food, food_types })
      .then(response => {
        this.props.history.push('/profile');
      })
      .catch(err => console.error(err));
      //console.log(food_types);
  }
  toggleBlock(e) { // Toggle food-preferences block
    if (this.state.blockClass === 'block_hidden'){
    this.setState({
      blockClass: 'block_visible'
    });
  } else {
    this.setState({
      blockClass: 'block_hidden'
    });
  }
  }
  render() {
    return (
      <section className="PostMeet">
        <h2 className="PostMeet__title">Post a new meet up!</h2>
        <form className="form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="about" className="form__label PostMeet__label">
            Meet is about...
          </label>
          <input type="text" className="form__input PostMeet__input" name="about" placeholder="Data structures" required />
          <label htmlFor="location" className="form__label PostMeet__label">
            Where is the meet?
          </label>
          <input type="text" className="form__input PostMeet__input" name="location" placeholder="Joes bar, Berlin, Germany" required />
          <label htmlFor="date" className=" form__label PostMeet__label">
            When is the meet?
          </label>
          <DatePicker dateFormat="YYYY/MM/DD" selected={this.state.startDate} onChange={this.handleChange} placeholderText="Click to select a date" minDate={moment()} name="date" />
          <div>
            <label htmlFor="food" className="form__label PostMeet__label">
              Please check if food will be served
            </label>
            <input type="checkbox" className="form__input PostMeet__input--checkbox" name="food" value="true" onChange={this.toggleBlock}/>
          </div>
          <div className={this.state.blockClass}>
            <label htmlFor="food__preferences" className="form__label PostMeet__label block__label">
              Which kind of food will you serve?
            </label>
            <input type="checkbox" className="form__input PostMeet__input--checkbox" name="food__preferences" value="Vegan" onChange={this.handleCheck}/> Vegan
            <input type="checkbox" className="form__input PostMeet__input--checkbox" name="food__preferences" value="Vegetarian" onChange={this.handleCheck}/> Vegetarian <br />
            <input type="checkbox" className="form__input PostMeet__input--checkbox" name="food__preferences" value="Low Carb" onChange={this.handleCheck}/> Low Carb
            <input type="checkbox" className="form__input PostMeet__input--checkbox" name="food__preferences" value="Dairy-Free" onChange={this.handleCheck}/> Dairy-Free
          </div>
          <input type="submit" className="form__button" defaultValue="Set up a meet" />
        </form>
      </section>
    );
  }
}

export default PostMeet;
