import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualKeyboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
