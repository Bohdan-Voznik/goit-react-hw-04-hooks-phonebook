import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ContactForm extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };
  state = {
    name: 'Bohdan Vozniak',
    number: '+380990172235',
  };

  handleChange = e => {
    const currentTarget = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState(prevState => {
      return {
        ...prevState,
        [currentTarget]: value,
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <br />
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
        </label>
        <br />
        <label>
          Number
          <br />
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />
        </label>

        <br />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
