import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { AboutComponent } from './about/about.component';
import { MatButtonModule, MatTabsModule, MatTableModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatListModule, MatSnackBarModule, MatDividerModule, MatStepperModule, MatSidenavModule, MatProgressBarModule, MatIconModule, MatRadioModule, MatPaginatorModule, MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    SupportComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,

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
  ]
})
export class SupportModule { }
