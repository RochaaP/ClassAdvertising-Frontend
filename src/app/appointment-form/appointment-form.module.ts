import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppointmentFormComponent } from './appointment-form.component';
import { AppointmentFormRoutingModule } from './appointment-form-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppointmentFormComponent
  ],
  imports: [
    AppointmentFormRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppointmentFormModule { }
