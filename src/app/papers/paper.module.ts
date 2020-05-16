import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { EditPaperComponent } from './editPaper/edit-paper.component';
import { ViewPaperComponent } from './viewPaper/view-paper.component';
import { StudentPaperComponent } from './studentPaper/student-paper/student-paper.component';
import { CreatePaperComponent } from './createPaper/create-paper/create-paper.component';
import { AnswerPaperComponent } from './studentPaper/answerPaper/answer-paper/answer-paper.component';
import { PaperMarkingModelComponent } from './studentPaper/answerPaper/paperMarkingModel/paper-marking-model/paper-marking-model.component';
import { KeyboardComponent } from '../util/keyboard/keyboard.component';
import { AngularSplitModule } from 'angular-split';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatRadioModule, MatExpansionModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    PaperComponent,
    EditPaperComponent,
    ViewPaperComponent,
    StudentPaperComponent,
    CreatePaperComponent,
    AnswerPaperComponent,
    PaperMarkingModelComponent,
    KeyboardComponent,
  ],
  imports: [
    PaperRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    AngularSplitModule,
    CountdownModule,
    QuillModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  entryComponents: [
    KeyboardComponent,
    CreatePaperComponent,
    PaperMarkingModelComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PaperModule { }
