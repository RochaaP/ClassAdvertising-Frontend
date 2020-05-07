import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNotesComponent } from './add-notes/add-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';

import { NotesRoutingModule } from './notes-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatButtonModule, MatTabsModule, MatTableModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatListModule, MatSnackBarModule, MatDividerModule, MatStepperModule, MatSidenavModule, MatProgressBarModule, MatIconModule, MatRadioModule, MatPaginatorModule, MatDialogModule } from '@angular/material';





@NgModule({
    declarations: [
        AddNotesComponent,
        ViewNotesComponent,
    ],
    imports: [
      CommonModule,
      NotesRoutingModule,

      FontAwesomeModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      ImageCropperModule,

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
  export class NotesModule { }
