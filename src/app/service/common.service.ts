import { Injectable } from '@angular/core';
import { WsCallback } from '../util/ws-callback';
import { ServiceUrls } from '../util/service-urls';
import { WsResponse } from '../util/ws-response';
import { WsType } from '../util/ws-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public getSubjectsAndInstructors(callBack: WsCallback){
    console.log("___getSubjectsAndInstructors()___");
    let url = ServiceUrls.GET_SUBJECTS_INSTRUCTORS;
    this.http.get(url).subscribe(data =>{
        var modified = JSON.parse(JSON.stringify(data));
        var res = new WsResponse(modified);
        callBack.onSuccess(res, WsType.GET_SUBJECTS_INSTRUCTORS);
    },
    error => {
        var modified = JSON.parse(JSON.stringify(error));
        var res = new WsResponse(modified);
        callBack.onFail(res, WsType.GET_SUBJECTS_INSTRUCTORS);
    });
  }
}
