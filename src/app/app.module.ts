import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { GridCellComponent } from './grid-cell/grid-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualKeyboardComponent,
    GridCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
