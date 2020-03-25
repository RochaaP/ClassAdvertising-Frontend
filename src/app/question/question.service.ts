import { Injectable } from '@angular/core';
import { WsCallback } from 'src/app/util/ws-callback';
import { ServiceUrls } from 'src/app/util/service-urls';
import { WsResponse } from 'src/app/util/ws-response';
import { HttpClient } from '@angular/common/http';
import { WsType } from 'src/app/util/ws-type';
import { LoadingService } from 'src/app/util/loading/loading.service';
import { QuestionModel } from './question-model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService) { }

  getQuestions(callBack: WsCallback){
    this.loadingService.showLoading("Loading", WsType.GET_ALL_QUESTIONS);
    let url = ServiceUrls.GET_QUESTIONS;
    this.http.get(url).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.GET_ALL_QUESTIONS);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.GET_ALL_QUESTIONS);
    });
  }

  getQuestionByPaperId(id: string, callBack: WsCallback){     
    // loading
    let url = ServiceUrls.getQuestionByPaperId(id);
    this.http.get(url).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.GET_QUESTIONS_BY_PAPER_ID);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.GET_QUESTIONS_BY_PAPER_ID);
    });
  }

  addQuestion(question: QuestionModel, callBack: WsCallback){
    // loading
    let url = ServiceUrls.CREATE_QUESTION;
    this.http.post(url, question).subscribe(data => {
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.CREATE_QUESTION);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.CREATE_QUESTION);
    });
  }

  public updateQuestion(question: {id: string, data: QuestionModel}){
    console.log("___updateQuestion()___");
    let url = ServiceUrls.UPDATE_QUESTION;
    this.http.put(url, question).subscribe(data=>{
      console.log("Question is updated");
    });
  }

  public deleteQuestion(question: {id: string, data: QuestionModel}){
    console.log("___deleteQuestion()___");
    let url = ServiceUrls.deleteQuestion(question.id);
    this.http.delete(url).subscribe(()=>{
      console.log("Question is deleted");
    });
  }
}
