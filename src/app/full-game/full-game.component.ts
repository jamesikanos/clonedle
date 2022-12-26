import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-full-game',
  templateUrl: './full-game.component.html',
  styleUrls: ['./full-game.component.scss']
})
export class FullGameComponent {

  private _answer: string = '';
  private _guesses: string[] = [];

  private _currentGuess = '';

  @HostBinding('tabindex') tabIndex = 1;

  @Input() set answer(value: string) {
    this._answer = value;
  }

  get answer() {
    return this._answer;
  }

  @Input() set guesses(value: string[]) {
    this._guesses = value;
  }

  get guesses() {
    return this._guesses;
  }

  get currentGuess() {
    return this._currentGuess;
  }

  get hasFinished() {
    return this.guesses.includes(this.answer.toLocaleUpperCase());
  }

  private onBackspace() {
    if (this._currentGuess.length == 0) {
      return;
    }

    this._currentGuess = this._currentGuess.substring(
      0,
      this._currentGuess.length - 1
    );
  }

  private onSubmitAnswer() {
    if (this.currentGuess.length < 5) {
      return;
    }

    this.guesses = [ ...this.guesses, this.currentGuess.toLocaleUpperCase() ];
    this._currentGuess = '';
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPressed(event: KeyboardEvent) {
    if (this.hasFinished) {
      return;
    }

    if (event.key == 'Enter') {
      this.onSubmitAnswer();
      return;
    }

    if (event.key == 'Backspace') {
      this.onBackspace();
      return;
    }

    this._currentGuess += event.key;
  }

  onVirtualKeyPress(letter: string) {

    if (this.hasFinished) {
      return;
    }

    if (letter === 'DELETE') {
      this.onBackspace();
      return;
    }

    if (letter === 'ENTER') {
      this.onSubmitAnswer();
      return;
    }

    this._currentGuess += letter.substring(0, 1);
  }

}
