import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { OwlModule } from 'ngx-owl-carousel';

import { TranslateModule } from '@ngx-translate/core';
import { NgaReadMoreModule } from 'nga-read-more';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

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
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { DropzoneDirective } from './service/dropzone/dropzone.directive';

// notification
import { NotificationBarModule } from 'ngx-notification-bar';

import { RootComponent } from './root/root.component';
import { NavigationComponent } from './navigation/navigation.component';

import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';

import { PostaddComponent } from './roles/common/postadd/postadd.component';

import { UploadTaskComponent } from './service/upload-task/upload-task.component';

import { MatGridListModule } from '@angular/material/grid-list';


import { DialogComponent } from './messages/dialog/dialog.component';
import { ConfirmationComponent } from './messages/confirmation/confirmation.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './support/footer/footer.component';
import { QuillModule } from 'ngx-quill';
import { PaperDetailsModalComponent } from './papers/studentPaper/paperDetailsModal/paper-details-modal/paper-details-modal.component';
import { LoginComponent } from './login/login.component';
import { ImageCropperModalComponent } from './util/image-cropper-modal/image-cropper-modal.component';



@NgModule({
  declarations: [
    RootComponent,
    NavigationComponent,
    NewsfeedComponent,
    PostaddComponent,

    DropzoneDirective,

    UploadTaskComponent,

    DialogComponent,
    ConfirmationComponent,
    PaperDetailsModalComponent,

    FooterComponent,

    LoginComponent,

    ImageCropperModalComponent,


  ],
  imports: [
    AppRoutingModule,
    // RouterModule.forRoot(
    //   appRoutes, {onSameUrlNavigation: 'reload'}//, useHash: true, enableTracing: true
    // ),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng4LoadingSpinnerModule.forRoot(),
    OwlModule,


    QuillModule.forRoot(),
    TranslateModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,

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
    MatDialogModule,

    ScrollingModule,
    NotificationBarModule
  ],
  entryComponents: [
    DialogComponent,
    ConfirmationComponent,
    PaperDetailsModalComponent,
    ImageCropperModalComponent
  ],
  providers: [],
  bootstrap: [RootComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class AppModule { }
