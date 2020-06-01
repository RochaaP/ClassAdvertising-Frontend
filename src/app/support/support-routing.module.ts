import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportComponent } from './support/support.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUSComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: SupportComponent },
  { path: 'about', component: AboutComponent},
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactUSComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
