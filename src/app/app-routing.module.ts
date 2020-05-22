import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './newsfeed/newsfeed/newsfeed.component';
import { RegisterComponent } from './register/register.component';
import { PostaddComponent } from './roles/common/postadd/postadd.component';
import { LoginComponent } from './login/login.component';


import { GuardService } from './service/guard/guard.service';

import { PaperModule } from './papers/paper.module';
import { SupportModule } from './support/support.module';
import { RolesModule } from './roles/roles.module';
import { ZoomModule } from './zoom/zoom.module';
import { NotesModule } from './notes/notes.module';
import { MessageModule } from './messages/message.module';
import { ImageCropperModalComponent } from './util/image-cropper-modal/image-cropper-modal.component';

const routes: Routes = [
  { path: '', component: NewsfeedComponent },
  { path: 'account/register', component: LoginComponent },
  { path: 'account/login', component: LoginComponent },

  { path: 'postadd', canActivate: [GuardService], component: PostaddComponent },

  // { path: 'papers', canActivate: [GuardService], loadChildren: () => PaperModule },
  // { path: 'zoom', canActivate: [GuardService], loadChildren: () => ZoomModule },
  // { path: 'messages', canActivate: [GuardService], loadChildren: () => MessageModule },
  // { path: 'support', loadChildren: () => SupportModule },
  // { path: 'profile', loadChildren: () => RolesModule },
  // { path: 'notes', loadChildren: () => NotesModule },

  // While building
  { path: 'papers', canActivate: [GuardService], loadChildren: './papers/paper.module#PaperModule' },
  { path: 'zoom', canActivate: [GuardService], loadChildren: './zoom/zoom.module#ZoomModule' },
  { path: 'messages', canActivate: [GuardService], loadChildren: './messages/message.module#MessageModule' },
  { path: 'support', loadChildren: './support/support.module#SupportModule' },
  { path: 'profile', loadChildren: './roles/roles.module#RolesModule' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
  
  { path: 'imageCropper', component: ImageCropperModalComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
