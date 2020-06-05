import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Instructor
import { EditProfileInstructorComponent } from './instructor/profile/edit-profile-instructor/edit-profile-instructor.component';
import { ViewProfileInstructorComponent } from './instructor/profile/view-profile-instructor/view-profile-instructor.component';
import { AddClassesInstructorComponent } from './instructor/classes/add-classes-instructor/add-classes-instructor.component';
import { PersonSearchComponent } from './instructor/person-search/person-search.component';
import { ViewClassesInstructorComponent } from './instructor/classes/view-classes-instructor/view-classes-instructor.component';
import { ProfileDetailsInstructorComponent } from './instructor/profile/profile-details-instructor/profile-details-instructor.component';


// Institute
import { EditProfileInstituteComponent } from './institute/profile/edit-profile-institute/edit-profile-institute.component';
import { ViewProfileInstituteComponent } from './institute/profile/view-profile-institute/view-profile-institute.component';
import { AddClassesInstituteComponent } from './institute/classes/add-classes-institute/add-classes-institute.component';
import { InstituteSearchComponent } from './institute/institute-search/institute-search.component';
import { ViewClassesInstituteComponent } from './institute/classes/view-classes-institute/view-classes-institute.component';
import { ProfileDetailsInstituteComponent } from './institute/profile/profile-details-institute/profile-details-institute.component';


// Student
import { EditProfileStudentComponent } from './student/profile/edit-profile-student/edit-profile-student.component';
import { ViewProfileStudentComponent } from './student/profile/view-profile-student/view-profile-student.component';


// admin
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { ImagesChangeComponent } from './admin/images-change/images-change.component';


import { ViewPostsComponent } from './common/view-posts/view-posts.component';

import { PapersComponent } from './common/papers/papers.component';
import { RolesRoutingModule } from './roles-routing.module';


import { MatButtonModule, MatTabsModule, MatTableModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatListModule, MatSnackBarModule, MatDividerModule, MatStepperModule, MatSidenavModule, MatProgressBarModule, MatIconModule, MatRadioModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotificationBarModule } from 'ngx-notification-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { MenuComponent } from './admin/menu/menu.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { FaqsComponent } from './admin/faqs/faqs.component';


@NgModule({
    declarations: [
    EditProfileInstructorComponent,
    ViewProfileInstructorComponent,
    AddClassesInstructorComponent,
    ViewClassesInstructorComponent,
    PersonSearchComponent,
    ProfileDetailsInstructorComponent,

    EditProfileInstituteComponent,
    ViewProfileInstituteComponent,
    AddClassesInstituteComponent,
    InstituteSearchComponent,
    ViewClassesInstituteComponent,
    ProfileDetailsInstituteComponent,

    AllUsersComponent,
    ImagesChangeComponent,

    ViewPostsComponent,

    PapersComponent,

    ViewUsersComponent,

    MenuComponent,

    DashboardComponent,

    SubjectComponent,

    FaqsComponent,

    EditProfileStudentComponent,

    ViewProfileStudentComponent

    ],
    imports: [
      CommonModule,
      RolesRoutingModule,

      FontAwesomeModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      ImageCropperModule,

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
      MatDatepickerModule ,
      
      ScrollingModule,
      NotificationBarModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class RolesModule { }
