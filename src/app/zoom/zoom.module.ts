import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomComponent } from './zoom.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatInputModule, MatCardModule, MatSnackBarModule, MatRadioModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatTabsModule, MatIconModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ZoomComponent],
  imports: [
    ZoomRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    ClipboardModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ZoomModule { }
