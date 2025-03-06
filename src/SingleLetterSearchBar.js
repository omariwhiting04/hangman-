import React, { Component } from 'react';

class SingleLetterSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: '', // Track the input letter
    };
  }

  // Handle input change
  handleChange = (e) => {
    this.setState({ letter: e.target.value.toUpperCase() }); // Keep it uppercase for consistency
  };

  // Submit guess
  handleSubmit = (e) => {
    e.preventDefault();
    const { letter } = this.state;
    if (letter && letter.length === 1) {
      this.props.onGuess(letter);
      this.setState({ letter: '' }); // Clear input after guess
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          maxLength="1"
          value={this.state.letter}
          onChange={this.handleChange}
        />
        <button type="submit">Guess</button>
      </form>
    );
  }
}

export default SingleLetterSearchBar;



