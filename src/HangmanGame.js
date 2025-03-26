import React, { Component } from 'react';
//import LetterBox from './LetterBox';
import SingleLetterSearchBar from './SingleLetterSearchBar';
import './App.css';

class HangmanGame extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  // Initial game state setup
  initialState = () => ({
    wordToGuess: 'REACT',
    guessedLetters: [],
    incorrectGuesses: 0,
    maxIncorrectGuesses: 6,
    gameStatus: 'playing',
  });

  // Start a new game
  handleNewGame = () => {
    this.setState(this.initialState());
  };

  // Handle user's letter guess
  handleGuess = (letter) => {
    const { wordToGuess, guessedLetters, incorrectGuesses, maxIncorrectGuesses, gameStatus } = this.state;

    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    const isCorrect = wordToGuess.includes(letter);
    const newIncorrectGuesses = isCorrect ? incorrectGuesses : incorrectGuesses + 1;

    let updatedStatus = 'playing';
    if (newIncorrectGuesses >= maxIncorrectGuesses) {
      updatedStatus = 'lost';
    } else if (wordToGuess.split('').every(l => newGuessedLetters.includes(l))) {
      updatedStatus = 'won';
    }

    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectGuesses: newIncorrectGuesses,
      gameStatus: updatedStatus,
    });
  };

  render() {
    const { wordToGuess, guessedLetters, incorrectGuesses, maxIncorrectGuesses, gameStatus } = this.state;

    // Word display
    const displayWord = wordToGuess
      .split('')
      .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');

    // Missed (incorrect) letters
    const missedLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    // Hangman images in order
    const hangmanImages = [
      `${process.env.PUBLIC_URL}/noose.png`,
      `${process.env.PUBLIC_URL}/1leg.png`,
      `${process.env.PUBLIC_URL}/botharms.png`,
      `${process.env.PUBLIC_URL}/1arm.png`,
      `${process.env.PUBLIC_URL}/upperandlowerbody.png`,
      `${process.env.PUBLIC_URL}/upperbody.png`,
      `${process.env.PUBLIC_URL}/dead.png`,
    ];

    // Select image based on incorrect guesses
    const hangmanImage = hangmanImages[
      incorrectGuesses < hangmanImages.length ? incorrectGuesses : hangmanImages.length - 1
    ];

    return (
      <div className="game-container">
        <h1>Hangman Game</h1>

        <p>Guess the word:</p>
        <p className="display-word">{displayWord}</p>

        <img src={hangmanImage} alt={`Hangman stage ${incorrectGuesses}`} />

        <p>Incorrect Guesses Left: {maxIncorrectGuesses - incorrectGuesses}</p>

        {gameStatus === 'playing' && (
          <SingleLetterSearchBar onGuess={this.handleGuess} />
        )}

        {missedLetters.length > 0 && (
          <p className="missed-letters">
            Missed Letters: {missedLetters.join(', ')}
          </p>
        )}

        {gameStatus === 'won' && (
          <p className="won-msg">🎉 Congratulations! You won!</p>
        )}
        {gameStatus === 'lost' && (
          <p className="lost-msg">💀 Game Over. The word was: {wordToGuess}</p>
        )}

        <button onClick={this.handleNewGame} className="new-game-btn">
          New Game
        </button>
      </div>
    );
  }
}

export default HangmanGame;
