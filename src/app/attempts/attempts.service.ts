import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WsCallback } from '../util/ws-callback';
import { ServiceUrls } from '../util/service-urls';
import { WsResponse } from '../util/ws-response';
import { WsType } from '../util/ws-type';
import { AttemptModel } from './attempt-model';

@Injectable({
  providedIn: 'root'
})
export class AttemptsService {

  constructor(private http: HttpClient) { }

  public getAttemptByUserId(userId: string, callBack: WsCallback){
    console.log("___getAttemptByUserId()___");
    let url = ServiceUrls.getAttemptsByUserId(userId);
    this.http.get(url).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.GET_ATTEMPTS);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.GET_ATTEMPTS);
    });
  }

  public getAttemptByUserIdPaperId(userId: string, paperId: string, callBack: WsCallback){
    console.log("___getAttemptByUserIdPaperId()___");
    let url = ServiceUrls.getAttemptsByUserIdPaperId(userId, paperId);
    this.http.get(url).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.GET_ATTEMPTS_USER_PAPER);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.GET_ATTEMPTS_USER_PAPER);
    });
  }

  public saveAttempt(attempt: AttemptModel, callBack: WsCallback){
    console.log("___saveAttempt()___");
    let url = ServiceUrls.SAVE_ATTEMPTS;
    this.http.post(url, attempt).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.SAVE_ATTEMPT);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.SAVE_ATTEMPT);
    });
  }
}
