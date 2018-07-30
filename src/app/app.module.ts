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
import { SessionComponent } from './session/session.component';
import { ApiService} from './api.service';
import { HttpClientModule} from '@angular/common/http';
import { SectionComponent } from './section/section.component';
import { EducationComponent } from './education/education.component';
import { IntroComponent } from './intro/intro.component';
import { EduSessionComponent } from './edu-session/edu-session.component';
import { StepComponent } from './step/step.component';
import { EducationSessionIndicatorComponent } from './education-session-indicator/education-session-indicator.component';
import { QuestionService } from './question.service';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent,
    MissingLetterComponent,
    StatementComponent,
    QuestionComponent,
    SessionComponent,
    SectionComponent,
    EducationComponent,
    IntroComponent,
    EduSessionComponent,
    StepComponent,
    EducationSessionIndicatorComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
