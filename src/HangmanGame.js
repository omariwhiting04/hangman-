import React, { Component } from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchBar from './SingleLetterSearchBar';
import './App.css';

class HangmanGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordToGuess: 'REACT', // Word that needs to be guessed
      guessedLetters: [], // Letters guessed by the user
      incorrectGuesses: 0, // Number of incorrect guesses
      maxIncorrectGuesses: 6, // Max wrong guesses before the game is lost
      gameStatus: 'playing', // Status of the game, can be 'playing', 'won', 'lost'
    };
  }

  // Handle letter guess
  handleGuess = (letter) => {
    const { wordToGuess, guessedLetters, incorrectGuesses, maxIncorrectGuesses } = this.state;

    if (guessedLetters.includes(letter)) return; // Prevent guessing the same letter twice

    const newGuessedLetters = [...guessedLetters, letter];
    let newIncorrectGuesses = incorrectGuesses;

    // Check if the guessed letter is in the word
    if (!wordToGuess.includes(letter)) {
      newIncorrectGuesses++;
    }

    const gameStatus = newIncorrectGuesses >= maxIncorrectGuesses
      ? 'lost'
      : wordToGuess.split('').every(letter => newGuessedLetters.includes(letter)) 
      ? 'won'
      : 'playing';

    this.setState({
      guessedLetters: newGuessedLetters,
      incorrectGuesses: newIncorrectGuesses,
      gameStatus,
    });
  };

  render() {
    const { wordToGuess, guessedLetters, incorrectGuesses, maxIncorrectGuesses, gameStatus } = this.state;

    // Display the word with underscores for unguessed letters
    const displayWord = wordToGuess.split('').map(letter =>
      guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');

    // Select the correct hangman images based on incorrect guesses
    const hangmanImages = [
      `${process.env.PUBLIC_URL}/1arm.png`,
      `${process.env.PUBLIC_URL}/1leg.png`,
      `${process.env.PUBLIC_URL}/botharms.png`,
      `${process.env.PUBLIC_URL}/dead.png`,
    ];

    // Select the correct hangman image based on incorrect guesses
    const hangmanImage = incorrectGuesses < hangmanImages.length
      ? hangmanImages[incorrectGuesses]
      : hangmanImages[hangmanImages.length - 1]; // Show "dead" image for max guesses


    return (
      <div className="game-container">
        <h1>Hangman Game</h1>
        <p>Guess the word:</p>
        <p>{displayWord}</p>

        <img src={hangmanImage} alt={`Hangman Stage ${incorrectGuesses}`} />

        {gameStatus === 'playing' && (
          <SingleLetterSearchBar onGuess={this.handleGuess} />
        )}

        {gameStatus === 'won' && <p>Congratulations! You won!</p>}
        {gameStatus === 'lost' && <p>Game Over. The word was: {wordToGuess}</p>}
      </div>
    );
  }
}

export default HangmanGame;
