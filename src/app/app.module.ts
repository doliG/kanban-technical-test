import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagSelectComponent } from './tag-select/tag-select.component';
import { CandidateCardComponent } from './candidate-card/candidate-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TagSelectComponent,
    CandidateCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CdkScrollableModule,
    ScrollingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
