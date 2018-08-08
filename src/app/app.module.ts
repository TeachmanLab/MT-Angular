import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatProgressBarModule } from '@angular/material';
import { ScenarioComponent } from './scenario/scenario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissingLetterComponent } from './missing-letter/missing-letter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatementComponent } from './statement/statement.component';
import { QuestionComponent } from './question/question.component';
import { SessionComponent } from './session/session.component';
import { ApiService} from './api.service';
import { LastService} from './last.service';
import { HttpClientModule} from '@angular/common/http';
import { IntroComponent } from './intro/intro.component';
import { StepComponent } from './step/step.component';
import { DivComponent } from './div/div.component';
import { PageComponent } from './page/page.component';
import { ControlConditionComponent } from './control-condition/control-condition.component';
import { TrainingConditionComponent } from './training-condition/training-condition.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent,
    MissingLetterComponent,
    StatementComponent,
    QuestionComponent,
    SessionComponent,
    IntroComponent,
    StepComponent,
    DivComponent,
    PageComponent,
    ControlConditionComponent,
    TrainingConditionComponent
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
    LastService,
    SessionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
