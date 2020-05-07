import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsgStudentComponent } from '../messages/msg-student/msg-student.component';
import { MsgInstructorComponent } from '../messages/msg-instructor/msg-instructor.component';


const routes: Routes = [

  { path: 'student', component: MsgStudentComponent },
  { path: 'instructor', component: MsgInstructorComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


  export class MessageRoutingModule { }
