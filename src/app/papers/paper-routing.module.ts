import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaperComponent } from './paper.component';
import { AnswerPaperComponent } from './studentPaper/answerPaper/answer-paper/answer-paper.component';

const routes: Routes = [
  { path: '', component: PaperComponent },
  { path: 'answer', component: AnswerPaperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaperRoutingModule { }
