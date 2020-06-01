import { Injectable, EventEmitter, Output } from '@angular/core';
import { ServiceUrls } from '../util/service-urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  
  @Output() saveToContactsEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public savedToContacts(){
    return this.saveToContactsEvent;
  }

  public saveToContactUs(req){
    console.log("saveToContactUs()___");
    let url = ServiceUrls.saveToContactUs();
    this.http.post(url, req).subscribe(data =>{
      this.saveToContactsEvent.emit({
        status: "OK"
      });
    },
    error => {
      this.saveToContactsEvent.emit({
        status: "Fail"
      })
    });
  }
}
