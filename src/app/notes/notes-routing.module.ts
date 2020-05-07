import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../service/guard/guard.service';

import { AddNotesComponent } from './add-notes/add-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';


const routes: Routes = [

    { path: '', component: ViewNotesComponent},
    { path: 'add', canActivate: [GuardService], component: AddNotesComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


  export class NotesRoutingModule { }
