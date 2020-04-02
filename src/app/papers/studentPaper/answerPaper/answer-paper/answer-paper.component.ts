import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/question/question.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { QuestionModel } from 'src/app/question/question-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaperModel } from 'src/app/papers/paper-model';
import { CountdownComponent } from 'ngx-countdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCaretLeft, faCaretRight, faAngleDoubleRight, faImage } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaperMarkingModelComponent } from '../paperMarkingModel/paper-marking-model/paper-marking-model.component';

@Component({
  selector: 'app-answer-paper',
  templateUrl: './answer-paper.component.html',
  styleUrls: ['./answer-paper.component.scss']
})
export class AnswerPaperComponent implements OnInit {

  faImage = faImage;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faAngleDoubleRight = faAngleDoubleRight;

  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;

  private config;

  private paper: {id: string, data: PaperModel};
  private questions: {id: string, data: QuestionModel}[] = []
  private answers: string[] = [];

  private timeOver: boolean = false;
  private questions_left: number = 0;
  private current_question_index: number = 0;

  constructor(
    private questionService: QuestionService,
    private loadingService: Ng4LoadingSpinnerService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) { 
    this.paper = JSON.parse(localStorage.getItem("paper"));
    this.adjustTime();
  }

  ngOnInit() {
    this.loadingService.show();
    this.questionService.getQuestionByPaperId(this.paper.id, this);
  }

  private answerEvent(){
    console.log(this.answers);
    let tmp_arr = this.answers.filter(element=>{return element != undefined});
    console.log(tmp_arr)
    this.questions_left = this.answers.length - tmp_arr.length;
  }

  private adjustTime(){
    this.config = {
      "leftTime": Number(this.paper.data.time) * 60,
      "demand": true,
      "notify": [10, 20, 60]
    }
  }

  private handleEvent(event){
    console.log(event)
    if(event.action == "notify"){
      let notifyMsg = "You have only " + event.left/1000 + " secs";
      console.log(notifyMsg);
      this.snackBar.open(notifyMsg, 'Done', {
        duration: 2000,
      });
    }
    else if(event.action == "done"){
      this.timeOver = true;
      let notifyMsg = "Your time's up";
      this.submitForMarking()
      console.log(notifyMsg);
      this.snackBar.open(notifyMsg, 'Done', {
        duration: 5000,
      });
    }
  }

  private configAnswerSettings(length: number){
    this.answers = new Array(length);
    this.questions_left = length;
  }

  private changeQuestion(index: number){
    if(index<0 || index>this.questions.length){
      return
    }
    else{
      // nothing to do
    }
    this.current_question_index = index;
  }

  private viewImage(imageModal){
    this.modalService.open(imageModal);
  }

  private submit(submitConfirmModal){
    this.modalService.open(submitConfirmModal);
  }

  private submitForMarking(){
    console.log("___submitForMarking()___");
    this.timeOver = true;
    const modalRef = this.modalService.open(PaperMarkingModelComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paper = this.paper;
    modalRef.componentInstance.questions = this.questions;
    modalRef.componentInstance.answers = this.answers;
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType==WsType.GET_QUESTIONS_BY_PAPER_ID){
      console.log("GET_QUESTIONS_BY_PAPER_ID");
      this.questions = data.payload;
      this.configAnswerSettings(this.questions.length);
      this.loadingService.hide();
      this.countdown.begin();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType==WsType.GET_QUESTIONS_BY_PAPER_ID){
      this.loadingService.hide();
    }
  }

}
