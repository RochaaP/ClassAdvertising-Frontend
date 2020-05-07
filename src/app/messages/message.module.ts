import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsgStudentComponent } from '../messages/msg-student/msg-student.component';
import { MsgInstructorComponent } from '../messages/msg-instructor/msg-instructor.component';

import { MessageRoutingModule } from './message-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatTabsModule, MatTableModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatListModule, MatSnackBarModule, MatDividerModule, MatStepperModule, MatSidenavModule, MatProgressBarModule, MatIconModule, MatRadioModule, MatPaginatorModule, MatDialogModule } from '@angular/material';





@NgModule({
    declarations: [
        MsgStudentComponent,
        MsgInstructorComponent,
    ],
    imports: [
      CommonModule,
      MessageRoutingModule,

      FontAwesomeModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,

      MatButtonModule,
      MatTabsModule,
      MatTableModule,
      MatCardModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      MatSelectModule,
      MatGridListModule,
      MatListModule,
      MatSnackBarModule,
      MatDividerModule,
      MatStepperModule,
      MatSidenavModule,
      MatProgressBarModule,
      MatIconModule,
      MatRadioModule,
      MatPaginatorModule,
      MatDialogModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class MessageModule { }
