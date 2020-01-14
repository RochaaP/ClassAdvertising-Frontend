import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
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

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { GuardService } from './service/guard/guard.service';
import { DropzoneDirective } from './service/dropzone/dropzone.directive';

import { RootComponent } from './root/root.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DirectProfileComponent } from './auth/common/profileview/direct-profile/direct-profile.component';
import { PersonProfileComponent } from './auth/person/profileview/person-profile/person-profile.component';
import { InstituteProfileComponent } from './auth/institute/profileview/institute-profile/institute-profile.component';
import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { PostaddComponent } from './auth/common/postadd/postadd.component';
import { UploadTaskComponent } from './service/upload-task/upload-task.component';
import { ViewProfilePersonComponent } from './auth/person/profileview/view-profile-person/view-profile-person.component';
import { ViewPersonPostsComponent } from './auth/person/view-person-posts/view-person-posts.component';
import { ViewPostsComponent } from './auth/common/view-posts/view-posts.component';
import { ViewProfileInstituteComponent } from './auth/institute/profileview/view-profile-institute/view-profile-institute.component';
import { ProfileDetailsInstituteComponent } from './auth/institute/profile-details-institute/profile-details-institute.component';
import { ClassComponent } from './auth/common/class/class.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClassesComponent } from './auth/person/classes/classes.component';
import { PapersComponent } from './auth/common/papers/papers.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { ClassesInstituteComponent } from './auth/institute/classes-institute/classes-institute.component';
import { ClassesPersonComponent } from './auth/person/classes-person/classes-person.component';
import { ClassesViewInstituteComponent } from './auth/institute/classes-view-institute/classes-view-institute.component';
import { ProfilesSearchComponent } from './auth/common/profiles-search/profiles-search.component';
import { PersonSearchComponent } from './auth/person/person-search/person-search.component';
import { InstituteSearchComponent } from './auth/institute/institute-search/institute-search.component';


const appRoutes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: RegisterComponent },
  { path: 'editprofile/person', canActivate: [GuardService], component: PersonProfileComponent },
  { path: 'editprofile/institute', canActivate: [GuardService], component: InstituteProfileComponent },
  { path: 'postadd', canActivate:[GuardService], component: PostaddComponent },
  { path: 'viewprofile/person/:id', component: ViewProfilePersonComponent},
  { path: 'viewprofile/institute/:id', component: ViewProfileInstituteComponent},
  { path: 'addclasses/person', canActivate: [GuardService], component: ClassesPersonComponent},
  { path: 'addclasses/institute', canActivate: [GuardService], component: ClassesInstituteComponent},
  { path: 'admin/getallusers', component: AllUsersComponent},
  { path: 'viewProfiles/person', component: PersonSearchComponent},
  { path: 'viewProfiles/institute', component: InstituteSearchComponent},



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
    PersonProfileComponent,
    InstituteProfileComponent,
    DirectProfileComponent,
    NewsfeedComponent,
    PostaddComponent,
    DropzoneDirective,
    UploadTaskComponent,
    ViewProfilePersonComponent,
    ViewPersonPostsComponent,
    ViewPostsComponent,
    ViewProfileInstituteComponent,
    ProfileDetailsInstituteComponent,
    ClassComponent,
    ClassesComponent,
    PapersComponent,
    AllUsersComponent,
    ClassesInstituteComponent,
    ClassesPersonComponent,
    ClassesViewInstituteComponent,
    ProfilesSearchComponent,
    PersonSearchComponent,
    InstituteSearchComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {onSameUrlNavigation: 'reload'}
    ),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng4LoadingSpinnerModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    BrowserAnimationsModule,

    MatButtonModule,
    MatTabsModule,
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
    MatRadioModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
