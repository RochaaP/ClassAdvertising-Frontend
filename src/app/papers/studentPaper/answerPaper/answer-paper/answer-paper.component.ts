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
import { AttemptModel } from 'src/app/attempts/attempt-model';
import { UserModel } from 'src/app/users/user-model';
import { SharedService } from 'src/app/shared/shared.service';
import { AttemptsService } from 'src/app/attempts/attempts.service';
import { firestore } from 'firebase/app';

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

  public viewModalImageUrl: string;

  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;

  public config;

  private loggedInUser: {id: string, data: UserModel}

  public paper: {id: string, data: PaperModel};
  public questions: {id: string, data: QuestionModel}[] = []
  public answers: string[] = [];

  public timeOver: boolean = false;
  private score: number = 0;
  public questions_left: number = 0;
  public current_question_index: number = 0;

  constructor(
    private questionService: QuestionService,
    private spinnerService: Ng4LoadingSpinnerService,
    private sharedService: SharedService,
    private attemptService: AttemptsService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) { 
    this.loggedInUser = this.sharedService.getLoggedInUser();
    if(localStorage.getItem("paper")!=undefined){
      this.paper = JSON.parse(localStorage.getItem("paper"));
      localStorage.removeItem("paper");
    }
    else{
      let notifyMsg = "No paper is selected"
      this.snackBar.open(notifyMsg, 'Done', {
        duration: 2000,
        verticalPosition: "top"
      });
    }
    if(this.loggedInUser==undefined){
      window.close();
    }
    this.adjustTime();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.questionService.getQuestionByPaperId(this.paper.id, this);
  }

  public answerEvent(){
    let tmp_arr = this.answers.filter(element=>{return element != undefined});
    this.questions_left = this.answers.length - tmp_arr.length;
  }

  private adjustTime(){
    this.config = {
      "leftTime": Number(this.paper.data.time) * 60,
      "demand": false,
      "notify": [10, 20, 60]
    }
  }

  public handleEvent(event){
    console.log(event)
    if(event.action == "notify"){
      let notifyMsg = "You have only " + event.left/1000 + " secs";
      console.log(notifyMsg);
      this.snackBar.open(notifyMsg, 'Done', {
        duration: 2000,
        verticalPosition: "top"
      });
    }
    else if(event.action == "done"){
      this.timeOver = true;
      let notifyMsg = "Your time's up";
      this.submitForMarking()
      console.log(notifyMsg);
      this.snackBar.open(notifyMsg, 'Done', {
        duration: 5000,
        verticalPosition: "top"
      });
    }
  }

  private configAnswerSettings(length: number){
    this.answers = new Array(length);
    this.questions_left = length;
  }

  public changeQuestion(index: number){
    if(index<0 || index>this.questions.length){
      return
    }
    else{
      // nothing to do
    }
    this.current_question_index = index;
  }

  public viewImage(imageModal, image:string){
    console.log(image);
    if(image =="a") {
      if(this.questions[this.current_question_index].data.imageA!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.imageA;      
      }
      else{
        return;
      }
    }
    else if(image =="b") {
      if(this.questions[this.current_question_index].data.imageB!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.imageB; 
      }       
      else{
        return;
      }  
    }
    else if(image == "c") {
      if(this.questions[this.current_question_index].data.imageC!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.imageC;    
      }       
      else{
        return;
      }   
    }
    else if(image == "d") { 
      if(this.questions[this.current_question_index].data.imageD!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.imageD;        
      }      
      else{
        return;
      }
    }
    else if(image == "e") {  
      if(this.questions[this.current_question_index].data.imageE!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.imageE;     
      }        
      else{
        return;
      } 
    }
    else {
      if(this.questions[this.current_question_index].data.image_url!=undefined){
        this.viewModalImageUrl = this.questions[this.current_question_index].data.image_url;  
      }      
      else{
        return;
      }
    }
    this.modalService.open(imageModal);
  }

  private calculateMarks(): number{
    let correctAnswers = 0;
    this.answers.forEach((el, index) =>{
      el == this.questions[index].data.answer? correctAnswers= correctAnswers+1: ''
    });
    return Number(((correctAnswers/this.questions.length) * 100).toFixed(2));
  }

  public submit(submitConfirmModal){
    this.modalService.open(submitConfirmModal);
  }

  public submitForMarking(){
    console.log("___submitForMarking()___");
    this.spinnerService.show();
    this.timeOver = true;
    this.score = this.calculateMarks();
    let attempt: AttemptModel = {
      average: this.score,
      highest: this.score,
      lowest: this.score, 
      no_of_attempts: 1,
      timestamp: firestore.Timestamp.now(),
      paper: this.paper.id,
      user: this.loggedInUser.id
    }
    this.attemptService.saveAttempt(attempt, this);       
  }

  private openMarkingModal(){
    const modalRef = this.modalService.open(PaperMarkingModelComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.score = this.score;
    modalRef.componentInstance.paper = this.paper;
    modalRef.componentInstance.questions = this.questions;
    modalRef.componentInstance.answers = this.answers;
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType==WsType.GET_QUESTIONS_BY_PAPER_ID){
      console.log("GET_QUESTIONS_BY_PAPER_ID");
      this.questions = data.payload;
      this.configAnswerSettings(this.questions.length);
      this.spinnerService.hide();
      this.countdown.begin();
      console.log("countdown began");
    }
    else if(serviceType==WsType.SAVE_ATTEMPT){
      console.log("SAVE_ATTEMPT");
      this.spinnerService.hide();
      this.openMarkingModal();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType==WsType.GET_QUESTIONS_BY_PAPER_ID){
      this.spinnerService.hide();
    }
    else if(serviceType==WsType.SAVE_ATTEMPT){
      this.submitForMarking();
    }
  }

}
