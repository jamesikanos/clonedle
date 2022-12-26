import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { LetterMatch } from '../letter-match';

const row1Letters: string[] = [ 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ];
const row2Letters: string[] = [ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L' ];
const row3Letters: string[] = [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M' ];

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent {

  private _answer: string = '';
  private _guesses: string[] = [];

  readonly row1: VirtualKey[] = row1Letters.map(k => {return { letter: k }});
  readonly row2: VirtualKey[] = row2Letters.map(k => {return { letter: k }});
  readonly row3: VirtualKey[] = row3Letters.map(k => {return { letter: k }});

  @Output() readonly keyPressed = new EventEmitter<string>();

  @Input() set answer(value: string) {
    value = value?.toLocaleUpperCase();
    this._answer = value;
    this.recalculateKeys();
  }

  get answer() {
    return this._answer;
  }

  @Input() set guesses(value: string[]) {
    this._guesses = value.map(g => g?.toLocaleUpperCase());
    this.recalculateKeys();
  }

  get guesses() {
    return this._guesses;
  }

  onKeyPressed(letter: string) {
    this.keyPressed.next(letter.toLocaleUpperCase());
  }

  private recalculateKeys() {
    const allKeys = [ ...this.row1, ...this.row2, ...this.row3 ];

    // Clear all keys
    allKeys.forEach(k => k.match = null);

    // Loop through each guess
    for (const guess of this._guesses) {
      // Loop through each letter
      for (let i = 0; i < guess.length; i++) {
        const thisLetter = guess[i];

        const key = allKeys.find(k => k.letter === thisLetter);

        // If the key is already a 'match', ignore...
        if (!key || key?.match === 'exact') {
          continue;
        }

        // If the letter matches the exact place (green)
        if (this._answer[i] == thisLetter) {
          key.match = 'exact';
          continue;
        }

        // If the letter partally matches (yellow)
        if (this._answer.includes(thisLetter)) {
          key.match = 'partial';
          continue;
        }

        // It didn't match, so is a miss
        key.match = 'miss';
      }
    }
  }
}

interface VirtualKey {
  letter: string;

  match?: LetterMatch;
}
