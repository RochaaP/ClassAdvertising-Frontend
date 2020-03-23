import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ServiceUrls } from '../util/service-urls';
import { WsResponse } from '../util/ws-response';
import { WsCallback } from '../util/ws-callback';
import { WsType } from '../util/ws-type';
import { PaperModel } from './paper-model';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private http: HttpClient) { }

  public loadPapers(callBack: WsCallback){
    console.log("___loadPapers()___");
    let url = ServiceUrls.GET_PAPERS;
    this.http.get(url).subscribe(data =>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.GET_ALL_PAPERS);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.GET_ALL_PAPERS);
    });
  }

  public addPaper(paper: PaperModel, callBack: WsCallback){
    console.log("___addPaper()___");
    // loading
    let url = ServiceUrls.CREATE_PAPER;
    this.http.post(url, paper).subscribe(data => {
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.CREATE_PAPER);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.CREATE_PAPER);
    });
  }

  public updatePaper(paper: {id: string, data: PaperModel}, callBack: WsCallback){
    console.log("___updatePaper()___");
    let url = ServiceUrls.UPDATE_PAPER;
    this.http.put(url, paper).subscribe(data=>{
      var modified = JSON.parse(JSON.stringify(data));
					var res = new WsResponse(modified);
					callBack.onSuccess(res, WsType.UPDATE_PAPER);
    },
    error => {
      var modified = JSON.parse(JSON.stringify(error));
      var res = new WsResponse(modified);
      callBack.onFail(res, WsType.UPDATE_PAPER);
    });
  }

  public deletePaper(paper: {id: string, data: PaperModel}){
    console.log("___deletePaper()___");
    let url = ServiceUrls.deletePaper(paper.id);
    this.http.delete(url).subscribe(()=>{
      console.log("Paper is deleted");
    });
  }
}
