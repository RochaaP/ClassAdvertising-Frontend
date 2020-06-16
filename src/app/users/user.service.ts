import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WsCallback } from '../util/ws-callback';
import { ServiceUrls } from '../util/service-urls';
import { WsResponse } from '../util/ws-response';
import { WsType } from '../util/ws-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserByEmail(email: string){
    console.log("___getUserByEmail()___");
    let url = ServiceUrls.getUserByEmail();
    let request = {
      "email": email
    }
    return this.http.post(url, request);
  }

  public removeUser(id: string){
    let url = ServiceUrls.deleteUser(id);
    return this.http.delete(url);
  }
}
