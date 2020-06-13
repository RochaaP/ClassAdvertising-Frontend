import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support/support.component';
import { AboutComponent } from './about/about.component';
import { MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, MatExpansionModule } from '@angular/material';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    SupportComponent,
    AboutComponent,
    ContactUSComponent,
    FaqComponent
  ],
  imports: [    
    SupportRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SupportModule { }
