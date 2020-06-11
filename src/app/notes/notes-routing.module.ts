import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../service/guard/guard.service';

import { AddNotesComponent } from './add-notes/add-notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { GuardInsService } from '../service/guard/guard-ins.service';


const routes: Routes = [

    { path: '', component: ViewNotesComponent},
    { path: 'add', canActivate: [GuardService, GuardInsService], component: AddNotesComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


    export class NotesRoutingModule { }
