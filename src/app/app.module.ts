///<reference path="../../node_modules/@angular/platform-browser/src/browser.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule, MatCardModule, MatToolbarModule, MatProgressBarModule} from '@angular/material';
import { ScenarioComponent } from './scenario/scenario.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MissingLetterComponent } from './missing-letter/missing-letter.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { StatementComponent } from './statement/statement.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent,
    MissingLetterComponent,
    StatementComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
