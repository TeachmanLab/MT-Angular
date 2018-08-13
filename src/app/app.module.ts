import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import {MatButtonModule, MatCardModule, MatToolbarModule, MatProgressBarModule, MatIconModule} from '@angular/material';
import { ScenarioComponent } from './scenario/scenario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissingLetterComponent } from './missing-letter/missing-letter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatementComponent } from './statement/statement.component';
import { QuestionComponent } from './question/question.component';
import { SessionComponent } from './session/session.component';
import { ApiService} from './api.service';
import { HttpClientModule} from '@angular/common/http';
import { StepComponent } from './step/step.component';
import { PageComponent } from './page/page.component';
import { ControlConditionComponent } from './control-condition/control-condition.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import { ThoughtbubbleComponent } from './thoughtbubble/thoughtbubble.component';
import { HighlightComponent } from './highlight/highlight.component';
import { TrainingComponent } from './training/training.component';
import { BulletListComponent } from './bullet-list/bullet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent,
    MissingLetterComponent,
    StatementComponent,
    QuestionComponent,
    SessionComponent,
    StepComponent,
    PageComponent,
    ControlConditionComponent,
    ProgressBarComponent,
    ThoughtbubbleComponent,
    HighlightComponent,
    TrainingComponent,
    BulletListComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    SessionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
