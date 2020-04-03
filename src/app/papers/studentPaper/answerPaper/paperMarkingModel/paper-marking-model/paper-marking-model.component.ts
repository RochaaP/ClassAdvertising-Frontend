import { Component, OnInit, Input } from '@angular/core';
import { PaperModel } from 'src/app/papers/paper-model';
import { QuestionModel } from 'src/app/question/question-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paper-marking-model',
  templateUrl: './paper-marking-model.component.html',
  styleUrls: ['./paper-marking-model.component.scss']
})
export class PaperMarkingModelComponent implements OnInit {

  @Input("paper") paper: {id: string, data: PaperModel};
  @Input("questions") questions: {id: string, data: QuestionModel}[] = []
  @Input("answers") answers: string[] = [];
  @Input("score") score: number = 0;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  closeWindow(){
    window.close();
  }

}
