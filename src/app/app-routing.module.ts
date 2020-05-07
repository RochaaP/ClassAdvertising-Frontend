import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { RegisterComponent } from './register/register.component';
import { PostaddComponent } from './roles/common/postadd/postadd.component';

import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';

import { ZoomComponent } from './zoom/zoom.component';

import { MsgStudentComponent } from './messages/msg-student/msg-student.component';
import { MsgInstructorComponent } from './messages/msg-instructor/msg-instructor.component';


import { GuardService } from './service/guard/guard.service';

import { PaperModule } from './papers/paper.module';
import { SupportModule } from './support/support.module';
import { RolesModule } from './roles/roles.module';


const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: RegisterComponent },

  { path: 'postadd', canActivate: [GuardService], component: PostaddComponent },

  { path: 'notes/addnote', canActivate: [GuardService], component: AddNotesComponent},
  { path: 'notes', component: ViewNotesComponent},

  { path: 'zoom', canActivate: [GuardService], component: ZoomComponent},

  { path: 'messages/student', component: MsgStudentComponent },
  { path: 'messages/instructor', component: MsgInstructorComponent },

  { path: 'papers', canActivate: [GuardService], loadChildren: () => PaperModule },
  { path: 'support', loadChildren: () => SupportModule },
  { path: 'profile', loadChildren: () => RolesModule }

  // { path: 'postadd', component: PostaddComponent },
  // { path: 'profileview/:id', component: ProfileViewComponent },

  // // { path: 'profile', component: ProfileComponent },
  // { path: '',component:NewsfeedComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
