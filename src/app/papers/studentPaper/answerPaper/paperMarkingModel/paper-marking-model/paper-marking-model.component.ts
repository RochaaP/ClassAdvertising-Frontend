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

  private score: number = 0;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.calculateMarks();
  }

  closeWindow(){
    window.close();
  }

  private calculateMarks(){
    let correctAnswers = 0;
    this.answers.forEach((el, index) =>{
      el == this.questions[index].data.answer? correctAnswers= correctAnswers+1: ''
    });
    this.score = Number(((correctAnswers/this.questions.length) * 100).toFixed(2));
    console.log(this.score);
  }

}
