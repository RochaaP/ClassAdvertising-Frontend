import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../service/guard/guard.service';

import { ViewProfileInstructorComponent } from './instructor/profile/view-profile-instructor/view-profile-instructor.component';
import { AddClassesInstructorComponent } from './instructor/classes/add-classes-instructor/add-classes-instructor.component';
import { PersonSearchComponent } from './instructor/person-search/person-search.component';

import { ViewProfileInstituteComponent } from './institute/profile/view-profile-institute/view-profile-institute.component';
import { AddClassesInstituteComponent } from './institute/classes/add-classes-institute/add-classes-institute.component';
import { InstituteSearchComponent } from './institute/institute-search/institute-search.component';

import { EditProfileInstructorComponent } from './instructor/profile/edit-profile-instructor/edit-profile-instructor.component';
import { EditProfileInstituteComponent } from './institute/profile/edit-profile-institute/edit-profile-institute.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ViewProfileStudentComponent } from './student/profile/view-profile-student/view-profile-student.component';
import { EditProfileStudentComponent } from './student/profile/edit-profile-student/edit-profile-student.component';


const routes: Routes = [

    { path: 'instructor/view/:id', component: ViewProfileInstructorComponent},
    { path: 'instructor/edit', canActivate: [GuardService], component: EditProfileInstructorComponent },
    { path: 'instructor/classes', canActivate: [GuardService], component: AddClassesInstructorComponent},
    { path: 'instructor/search', component: PersonSearchComponent},

    { path: 'institute/view/:id', component: ViewProfileInstituteComponent},
    { path: 'institute/edit', canActivate: [GuardService], component: EditProfileInstituteComponent },
    { path: 'institute/classes', canActivate: [GuardService], component: AddClassesInstituteComponent },
    { path: 'institute/search', component: InstituteSearchComponent},

    { path: 'student/view/:id', component: ViewProfileStudentComponent},
    { path: 'student/edit', canActivate: [GuardService], component: EditProfileStudentComponent },

    { path: 'admin', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
