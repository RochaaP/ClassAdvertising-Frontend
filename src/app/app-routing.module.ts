import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { PostaddComponent } from './roles/common/postadd/postadd.component';
import { LoginComponent } from './login/login.component';


import { GuardService } from './service/guard/guard.service';
import { PaymentComponent } from './service/payment/payment.component';
import { GuardInsService } from './service/guard/guard-ins.service';

const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: LoginComponent },
  { path: 'account/login', component: LoginComponent },

  { path: 'postadd', canActivate: [GuardService], component: PostaddComponent },

  // While building
  { path: 'payments', canActivate: [GuardService, GuardInsService], component: PaymentComponent},
  { path: 'papers', canActivate: [GuardService], loadChildren: './papers/paper.module#PaperModule' },
  { path: 'zoom', canActivate: [GuardService, GuardInsService], loadChildren: './zoom/zoom.module#ZoomModule' },
  { path: 'messages', canActivate: [GuardService], loadChildren: './messages/message.module#MessageModule' },
  { path: 'support', loadChildren: './support/support.module#SupportModule' },
  { path: 'profile', loadChildren: './roles/roles.module#RolesModule' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
  { path: 'appointment', loadChildren: './appointment-form/appointment-form.module#AppointmentFormModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
