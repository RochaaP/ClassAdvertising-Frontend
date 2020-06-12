import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { InitiatePaymentsComponent } from './initiate-payments/initiate-payments.component';

const routes: Routes = [
  { path: '', component: PaymentsComponent },
  { path: 'initiate', component: InitiatePaymentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
