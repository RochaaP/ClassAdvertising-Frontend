import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

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

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

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

const appRoutes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: RegisterComponent },
  { path: 'editprofile/person', component: PersonProfileComponent },
  { path: 'editprofile/institute', component: InstituteProfileComponent },
  { path: 'postadd', component: PostaddComponent },
  { path: 'viewprofile/person/:id', component: ViewProfilePersonComponent},
  { path: 'viewprofile/institute/:id', component: ViewProfileInstituteComponent},
  { path: 'addclasses/person', component: ClassComponent},




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
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
