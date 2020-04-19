import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { OwlModule } from 'ngx-owl-carousel';

import { AngularSplitModule } from 'angular-split';
import { TranslateModule } from '@ngx-translate/core';
import { NgaReadMoreModule } from 'nga-read-more';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule  } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { GuardService } from './service/guard/guard.service';
import { DropzoneDirective } from './service/dropzone/dropzone.directive';

import { RootComponent } from './root/root.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EditProfileInstituteComponent } from './roles/institute/profile/edit-profile-institute/edit-profile-institute.component';

import { EditProfileInstructorComponent } from './roles/instructor/profile/edit-profile-instructor/edit-profile-instructor.component';

import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { PostaddComponent } from './roles/common/postadd/postadd.component';
import { UploadTaskComponent } from './service/upload-task/upload-task.component';
import { ViewProfileInstructorComponent } from './roles/instructor/profile/view-profile-instructor/view-profile-instructor.component';

import { ProfileDetailsInstructorComponent } from './roles/instructor/profile/profile-details-instructor/profile-details-instructor.component';

import { ViewProfileInstituteComponent } from './roles/institute/profile/view-profile-institute/view-profile-institute.component';
import { ProfileDetailsInstituteComponent } from './roles/institute/profile/profile-details-institute/profile-details-institute.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewClassesInstructorComponent } from './roles/instructor/classes/view-classes-instructor/view-classes-instructor.component';

import { PapersComponent } from './roles/common/papers/papers.component';
import { AllUsersComponent } from './roles/admin/all-users/all-users.component';
import { AddClassesInstituteComponent } from './roles/institute/classes/add-classes-institute/add-classes-institute.component';
import { AddClassesInstructorComponent } from './roles/instructor/classes/add-classes-instructor/add-classes-instructor.component';

import { ViewClassesInstituteComponent } from './roles/institute/classes/view-classes-institute/view-classes-institute.component';
import { PersonSearchComponent } from './roles/instructor/person-search/person-search.component';
import { InstituteSearchComponent } from './roles/institute/institute-search/institute-search.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';
import { MsgStudentComponent } from './messages/msg-student/msg-student.component';
import { DialogComponent } from './messages/dialog/dialog.component';
import { ConfirmationComponent } from './messages/confirmation/confirmation.component';
import { MsgInstructorComponent } from './messages/msg-instructor/msg-instructor.component';
import { ImagesChangeComponent } from './roles/admin/images-change/images-change.component';

import { EditPaperComponent } from './papers/editPaper/edit-paper.component';
import { ViewPaperComponent } from './papers/viewPaper/view-paper.component';
import { PaperComponent } from './papers/paper.component';
import { KeyboardComponent } from './util/keyboard/keyboard.component';
import { LoadingComponent } from './util/loading/loading.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CountdownModule } from 'ngx-countdown';

import { fromEventPattern } from 'rxjs';

import { StudentPaperComponent } from './papers/studentPaper/student-paper/student-paper.component';
import { CreatePaperComponent } from './papers/createPaper/create-paper/create-paper.component';
import { PaperDetailsModalComponent } from './papers/studentPaper/paperDetailsModal/paper-details-modal/paper-details-modal.component';
import { AnswerPaperComponent } from './papers/studentPaper/answerPaper/answer-paper/answer-paper.component';
import { PaperMarkingModelComponent } from './papers/studentPaper/answerPaper/paperMarkingModel/paper-marking-model/paper-marking-model.component';



const appRoutes: Routes = [
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


  { path: 'papers', canActivate: [GuardService], component: PaperComponent},
  { path: 'answerpaper', component: AnswerPaperComponent},


  { path: 'messages/student', component: MsgStudentComponent },
  { path: 'messages/instructor', component: MsgInstructorComponent },

  // { path: 'postadd', component: PostaddComponent },
  // { path: 'profileview/:id', component: ProfileViewComponent },

  // // { path: 'profile', component: ProfileComponent },
  // { path: '',component:NewsfeedComponent }

];


@NgModule({
  declarations: [
    RootComponent,
    RegisterComponent,
    NavigationComponent,
    EditProfileInstituteComponent,
    NewsfeedComponent,
    PostaddComponent,
    DropzoneDirective,
    UploadTaskComponent,
    ViewProfileInstructorComponent,
    ProfileDetailsInstructorComponent,
    ViewProfileInstituteComponent,
    ProfileDetailsInstituteComponent,
    EditProfileInstructorComponent,

    ViewClassesInstructorComponent,
    PapersComponent,
    AllUsersComponent,
    AddClassesInstituteComponent,
    AddClassesInstructorComponent,
    ViewClassesInstituteComponent,
    PersonSearchComponent,
    InstituteSearchComponent,

    EditPaperComponent,
    ViewPaperComponent,
    PaperComponent,

    KeyboardComponent,
    LoadingComponent,

    AddNotesComponent,
    ViewNotesComponent,

    MsgStudentComponent,
    DialogComponent,
    ConfirmationComponent,
    StudentPaperComponent,
    CreatePaperComponent,
    PaperDetailsModalComponent,
    AnswerPaperComponent,
    PaperMarkingModelComponent,
    MsgInstructorComponent,
    ImagesChangeComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {onSameUrlNavigation: 'reload'}
    ),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng4LoadingSpinnerModule.forRoot(),
    OwlModule,

    AngularSplitModule.forRoot(),
    TranslateModule.forRoot(),
    QuillModule.forRoot(),
    CountdownModule,

    NgaReadMoreModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    BrowserAnimationsModule,

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

    ScrollingModule

  ],
  entryComponents: [
    KeyboardComponent,
    DialogComponent,
    ConfirmationComponent,
    CreatePaperComponent,
    PaperDetailsModalComponent,
    PaperMarkingModelComponent
  ],
  providers: [],
  bootstrap: [RootComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class AppModule { }
