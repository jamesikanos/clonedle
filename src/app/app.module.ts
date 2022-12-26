import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { GridCellComponent } from './grid-cell/grid-cell.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { FullGameComponent } from './full-game/full-game.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualKeyboardComponent,
    GridCellComponent,
    GameGridComponent,
    FullGameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
