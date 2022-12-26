import { Component, Input } from '@angular/core';
import { LetterMatch } from '../letter-match';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss']
})
export class GameGridComponent {

  private _currentGuess: string = '';
  private _answer: string = '';
  private _guesses: string[] = [];

  @Input() set currentGuess(value: string) {
    this._currentGuess = value?.toLocaleUpperCase();
  }

  @Input() set answer(value: string) {
    this._answer = value?.toLocaleUpperCase();
  }

  @Input() set guesses(value: string[]) {
    this._guesses = value;

    if (this._guesses.length > 6) {
      this._guesses = this._guesses.slice(0, 6);
    }
  }

  get guesses() {
    return this._guesses;
  }

  get numberOfEmptyRows() {
    return Math.max(0, 5 - this._guesses.length);
  }

  get canShowCurrentGuess() {
    return this._guesses.length < 6;
  }

  letterOfCurrentGuess(index: number) {
    if (this._currentGuess.length > index) {
      return this._currentGuess[index];
    }

    return '';
  }

  letterOfGuess(guess: string, index: number) {
    if (guess.length > index) {
      return guess[index];
    }

    return '';
  }

  matchForLetter(guess: string, index: number): LetterMatch {
    guess = guess?.toLocaleUpperCase();

    const guessLetter = guess[index];
    const answerLetter = this._answer[index];

    if (guessLetter == answerLetter) {
      return 'exact';
    }

    if (this._answer.includes(guessLetter)) {
      return 'partial';
    }

    return 'miss';
  }
}
