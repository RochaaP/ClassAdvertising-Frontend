import { Component, OnInit, Input } from '@angular/core';
import { PaperModel } from '../paper-model';
import { QuestionModel } from '../../question/question-model';
import { SharedService } from 'src/app/shared/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionService } from '../../question/question.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeyboardComponent } from 'src/app/util/keyboard/keyboard.component';
import { Subscription } from 'rxjs';
import { PaperService } from '../paper.service';
import { UserModel } from 'src/app/users/user-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SubjectService } from 'src/app/subjects/subject.service';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-paper',
  templateUrl: './edit-paper.component.html',
  styleUrls: ['./edit-paper.component.scss']
})
export class EditPaperComponent implements OnInit {

  private paper: {id: string, data: PaperModel};
  private subjectName: string = "XXXXXXXXXX";

  private loggedInUser: {id: string, data: UserModel};

  private questionList: {id: string, data: QuestionModel}[] = [];
  private deletedQuestionList: {id: string, data: QuestionModel}[] = [];

  private isShowPaperDetail: boolean = false;
  private isShowQuestion: boolean = false;

  private width;

  private publish: string = 'no';

  constructor(
    private sharedService: SharedService,
    private translate: TranslateService,
    private questionService: QuestionService, 
    private paperService: PaperService,
    private subjectService: SubjectService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    this.loggedInUser = this.sharedService.getLoggedInUser();
  }

  ngOnInit() {

    // Add Dummy Details
    this.addDummyDetails();
    this.sharedService.loadPaperWithDataRespond().subscribe(res => {      
      this.isShowPaperDetail = false;
      this.paper = res.paper;
      this.questionService.getQuestionByPaperId(this.paper.id, this);
      this.subjectService.getSubjectsAndInstructors(this);
      this.isShowPaperDetail = true;
    });    
    // this.sharedService.changeCreatePaperWidthRespond().subscribe(res =>{
    //   this.width = res.data;
    // })
  }

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

  private openKeyboard(curentText: string, isArray: boolean, variable: any, index: number, path: string) {    
    console.log("___openKeyboard()___");
    const modalRef = this.modalService.open(KeyboardComponent);

    modalRef.componentInstance.text = curentText;

    let modalText: string;

    let modalSubscription: Subscription = modalRef.componentInstance.modalText.subscribe(res => {
      console.log(res);
      modalText = res;

      if (isArray){
        if (path != undefined){
          let path_var = path.split('.');
          let length = path_var.length;
          switch (length){
            case 1: {
              modalText != undefined ? variable[index][path_var[0]] = modalText : variable = curentText;
              break;
            }
            case 2: {
              modalText != undefined ? variable[index][path_var[0]][path_var[1]] = modalText : variable = curentText;
              break;
            }
            case 3: {
              modalText != undefined ? variable[index][path_var[0]][path_var[1]][path_var[2]] = modalText : variable = curentText;
              break;
            }
          }
        }
      }
      else{
        modalText != undefined ? variable = modalText : variable = curentText;
      }
      modalSubscription.unsubscribe();
    });
  }

  private addDummyDetails(){
    this.addDummyPaper();
    this.addDummyQuestions();
  }

  private addDummyPaper(){
    this.paper = {
      id: "0",
      data: {
        name: "Model Paper XX",
        year: "2019",
        instructor: "XXXXXXXXXX",
        subject: "XXXXXXXXXX",
        grade_level: "Other",
        no_of_questions: 50,
        added_questions: 0,
        time: "60",
        questions: "",
        price: "",
        published: false
      }
    }
  }



  private addDummyQuestions(){
    for (let index = 0; index < 5; index++) {
      let question: {id: string, data: QuestionModel};
      question = {
        id: "0",
        data: {
          subject: "Maths",
          instructor: "Erantha Welikala",

          question: index.toString() + "What is the sum of (square of 2, root of 16)",

          a: "8",
          b: "12",
          c: "20",
          d: "6",
          e: "2",

          answer: "A",

          paper: "", 
          number: index.toString(),
          
          image: false,
          image_url: "",
          metadata: ""
        }
      }
      this.questionList.push(question);      
    }    
  }

  public addNewQuestion(){
    console.log("___addNewQuestion()___"); 
    // Checking whether more questions can be added or not
    if (this.paper.data.no_of_questions > this.questionList.length){
      this.createDummyQuestion();
      console.log("Question is added!!!");
      let notifyMsg: string = "Question is added";
      this.showSnackBar(notifyMsg);
    }
    else{
      let notifyMsg: string = "You have already defined all the questions for this paper";
      this.showSnackBar(notifyMsg);
    }
  }

  private createDummyQuestion(){
    let question: {id: string, data: QuestionModel} = {
      "id": "0",
      "data": {
        subject: "Maths",
        instructor: "Erantha Welikala",

        question: this.questionList.length.toString() + "What is the sum of (square of 2, root of 16)",

        a: "8",
        b: "12",
        c: "20",
        d: "6",
        e: "2",

        answer: "A",

        paper: "", 
        number: this.questionList.length.toString(),
        
        image: false,
        image_url: "",
        metadata: ""
      }
    }
    this.questionList.push(question);
  }

  public changePositionQuestion(question: QuestionModel, index: number, direction: string){
    console.log("___changePositionQuestion()___");
    if (direction == "up"){
      [this.questionList[index], this.questionList[index - 1]] = [this.questionList[index - 1], this.questionList[index]];
      let notifyMsg = "Question is moved up. Press save to keep changes";
      this.showSnackBar(notifyMsg);
    }
    else{
      [this.questionList[index], this.questionList[index + 1]] = [this.questionList[index + 1], this.questionList[index]];
      let notifyMsg = "Question is moved down. Press save to keep changes";
      this.showSnackBar(notifyMsg);
    }

  }

  public saveQuestions(){
    this.spinnerService.show();
    this.deletedQuestionList.forEach(async element => {
      this.questionService.deleteQuestion(element);
    })
    this.questionList.forEach(async element => {
      let index: number = this.questionList.indexOf(element);
      let que: QuestionModel = {
        "instructor": this.loggedInUser.id,
        "subject": this.paper.data.subject,
        "question": element.data.question,
        "a": element.data.a,
        "b": element.data.b,
        "c": element.data.c,
        "d": element.data.d,
        "e": element.data.e,
        "answer": element.data.answer,
        "paper": this.paper.id,
        "number": (index + 1).toString(),
        "image": element.data.image,
        "image_url": element.data.image_url,
        "metadata": element.data.metadata
      };
      console.log(JSON.stringify(que));
      if (element.id != "0") {
        this.questionService.updateQuestion({ id: element.id, data: que });
      }
      else {
        this.questionService.addQuestion(que, this);
      }
      // await this.paperService.updatePaper(this.paper.data, this.paper.id).then(onfulfilled => {
      //   console.log(onfulfilled);
      //   // Hide Loading
      //   // this.filterQuestionsByPaper();
      // }, onrejected => {
      //   console.log(onrejected);
      //   // Hide Loading
      //   // this.filterQuestionsByPaper();
      // });
    });
    this.paper.data.added_questions = this.questionList.length;
    this.paperService.updatePaper(this.paper, this);
  }

  public deleteQuestion(question: {id: string, data: QuestionModel}, index: number){
    console.log("___deleteQuestion()___");
    this.questionList.splice(index, 1);
    this.deletedQuestionList.push(question);
    let notifyMsg = "Question is moved to recycle bin";
    this.showSnackBar(notifyMsg);
  }

  public paperDetailSave(){
    console.log("___paperDetailSave()___");
    this.spinnerService.show();
    this.paperService.updatePaper(this.paper, this);
  }

  public openPublishModal(publishModal){
    this.modalService.open(publishModal, { backdrop: "static"});
  }

  public publishPaper(){
    if(this.paper.data.added_questions != this.questionList.length && this.paper.data.added_questions != this.paper.data.no_of_questions){
      let notifyMsg = "There is an error in number of questions. Please check again";
      this.showSnackBar(notifyMsg);
      return;
    }
    else{
      // nothing to do
    }
    this.paper.data.published = true;
    this.paperService.publishPaper(this.paper, this);
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if (serviceType == WsType.GET_QUESTIONS_BY_PAPER_ID){
      console.log("GET_QUESTIONS_BY_PAPER_ID");
      this.questionList = data.payload;
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.GET_SUBJECTS){
      console.log("GET_SUBJECTS");
      let subjects: {id: string, data: SubjectModel}[] = data.payload['subjects'];
      this.subjectName = "XXXXXXXXXX";
      subjects.forEach(element => {
        this.paper.data.subject == element.id? this.subjectName = element.data.name: ""
      });
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.UPDATE_PAPER){
      console.log("UPDATE_PAPER");
      this.spinnerService.hide();
      let notifyMsg = "Paper is successfully updated";
      this.showSnackBar(notifyMsg);
    }
    else if(serviceType == WsType.PUBLISH_PAPER){
      console.log("PUBLISH_PAPER");
      this.spinnerService.hide();
      let notifyMsg = "Paper is successfully published";
      this.showSnackBar(notifyMsg);
      this.router.navigate(["/papers/"]);
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if (serviceType == WsType.GET_QUESTIONS_BY_PAPER_ID){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.GET_SUBJECTS){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.UPDATE_PAPER){
      console.log("UPDATE_PAPER");
      this.spinnerService.hide();
      let notifyMsg = "Paper is failed to update";
      this.showSnackBar(notifyMsg);
    }
    else if(serviceType == WsType.PUBLISH_PAPER){
      console.log("PUBLISH_PAPER");
      this.spinnerService.hide();
      let notifyMsg = "Paper is failed to publish";
      this.showSnackBar(notifyMsg);
    }
  }

}
