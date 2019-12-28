import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private emailSource = new BehaviorSubject('');
  currentEmail = this.emailSource.asObservable();

  // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor() { }

  passMessage(message: string) {
    this.messageSource.next(message);
  }

  passEmail(email: string) {
    this.emailSource.next(email);
  }

  // getEmitterUserName() {
  //   this.getLoggedInName.emit(JSON.parse(localStorage.getItem('registerUserName')));
  // }

  getUserName(){
    return JSON.parse(localStorage.getItem('registerUserName'));
  }


}
