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

  private searchSource = new BehaviorSubject('kasjdfk');
  currentSearch = this.searchSource.asObservable();

  // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor() { }

  passMessage(message: string) {
    this.messageSource.next(message);
  }

  passEmail(email: string) {
    this.emailSource.next(email);
  }

  passSearch(search: string) {
    this.searchSource.next(search);
  }

  // getEmitterUserName() {
  //   this.getLoggedInName.emit(JSON.parse(localStorage.getItem('registerUserName')));
  // }

  getUserName(){
    return JSON.parse(localStorage.getItem('registerUserName'));
  }


}
