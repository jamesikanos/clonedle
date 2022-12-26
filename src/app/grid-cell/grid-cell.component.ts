import { Component, HostBinding, Input } from '@angular/core';
import { LetterMatch } from '../letter-match';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent {
  @Input() letter: string = '';
  @Input() match?: LetterMatch;

  @HostBinding('attr.cy-letter') get cyLetter(): string {
    return this.letter;
  }

  @HostBinding('class.used') get hasBeenUsed(): boolean {
    return !!this.match;
  }

  @HostBinding('class.exact') get isExactMatch() {
    return this.match == 'exact';
  }

  @HostBinding('class.partial') get isPartialMatch() {
    return this.match == 'partial';
  }

  @HostBinding('class.miss') get isMismatch() {
    return this.match == 'miss';
  }

  get displayValue(): string {
    if (!this.letter?.length) {
      return '';
    }

    return this.letter.substring(0, 1).toLocaleUpperCase();
  }
}
