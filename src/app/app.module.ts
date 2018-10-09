import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
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
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ThoughtbubbleComponent } from './thoughtbubble/thoughtbubble.component';
import { HighlightComponent } from './highlight/highlight.component';
import { TrainingComponent } from './training/training.component';
import { BulletListComponent } from './bullet-list/bullet-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SessionIndicatorBarComponent } from './session-indicator-bar/session-indicator-bar.component';
import { StepIndicatorBarComponent } from './step-indicator-bar/step-indicator-bar.component';
import { SessionIndicatorComponent } from './session-indicator/session-indicator.component';


const routes: Routes = [
  { path: '', redirectTo: 'control', pathMatch: 'full'},
  { path: 'training', component: TrainingComponent },
  { path: 'training/:session', component: TrainingComponent },
  { path: 'control', component: ControlConditionComponent },
  { path: 'control/:session', component: ControlConditionComponent }
];

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
    BulletListComponent,
    SessionIndicatorBarComponent,
    StepIndicatorBarComponent,
    SessionIndicatorComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    SessionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
