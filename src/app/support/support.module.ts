import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { AboutComponent } from './about/about.component';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [
    SupportComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule, 
    MatCardModule
  ]
})
export class SupportModule { }
