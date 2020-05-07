import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { RegisterComponent } from './register/register.component';
import { EditProfileInstructorComponent } from './roles/instructor/profile/edit-profile-instructor/edit-profile-instructor.component';
import { EditProfileInstituteComponent } from './roles/institute/profile/edit-profile-institute/edit-profile-institute.component';
import { PostaddComponent } from './roles/common/postadd/postadd.component';
import { ViewProfileInstructorComponent } from './roles/instructor/profile/view-profile-instructor/view-profile-instructor.component';
import { ViewProfileInstituteComponent } from './roles/institute/profile/view-profile-institute/view-profile-institute.component';
import { AddClassesInstructorComponent } from './roles/instructor/classes/add-classes-instructor/add-classes-instructor.component';
import { AddClassesInstituteComponent } from './roles/institute/classes/add-classes-institute/add-classes-institute.component';
import { PersonSearchComponent } from './roles/instructor/person-search/person-search.component';
import { InstituteSearchComponent } from './roles/institute/institute-search/institute-search.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';
import { AllUsersComponent } from './roles/admin/all-users/all-users.component';
import { ImagesChangeComponent } from './roles/admin/images-change/images-change.component';
import { ZoomComponent } from './zoom/zoom.component';
import { MsgStudentComponent } from './messages/msg-student/msg-student.component';
import { MsgInstructorComponent } from './messages/msg-instructor/msg-instructor.component';


import { GuardService } from './service/guard/guard.service';
import { PaperModule } from './papers/paper.module';
import { SupportModule } from './support/support.module';


const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: RegisterComponent },
  { path: 'editprofile/instructor', canActivate: [GuardService], component: EditProfileInstructorComponent },
  { path: 'editprofile/institute', canActivate: [GuardService], component: EditProfileInstituteComponent },
  { path: 'postadd', canActivate: [GuardService], component: PostaddComponent },
  { path: 'viewprofile/instructor/:id', component: ViewProfileInstructorComponent},
  { path: 'viewprofile/institute/:id', component: ViewProfileInstituteComponent},
  { path: 'addclasses/instructor', canActivate: [GuardService], component: AddClassesInstructorComponent},
  { path: 'addclasses/institute', canActivate: [GuardService], component: AddClassesInstituteComponent },
  { path: 'viewProfiles/instructor', component: PersonSearchComponent},
  { path: 'viewProfiles/institute', component: InstituteSearchComponent},
  { path: 'notes/addnote', canActivate: [GuardService], component: AddNotesComponent},
  { path: 'notes', component: ViewNotesComponent},

  { path: 'admin/getallusers', component: AllUsersComponent},
  { path: 'admin/images', component: ImagesChangeComponent},

  { path: 'zoom', canActivate: [GuardService], component: ZoomComponent},

  { path: 'messages/student', component: MsgStudentComponent },
  { path: 'messages/instructor', component: MsgInstructorComponent },
  { path: 'papers', canActivate: [GuardService], loadChildren:() => PaperModule},
  { path: 'support', loadChildren: () => SupportModule }
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
