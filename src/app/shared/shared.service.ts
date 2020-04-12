import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../users/user-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public viewPaperWidth = 20;
  public createPaperWidth = 75;
  public sidePanelWidth = 5;

  private loggedInUser: {id: string, data: UserModel};
  // private loggedInUser: {id: string, data: UserModel} = {
  //   id: "NdFYp85MYbdFkmfY5YNs",
  //   data: {
  //     role: "i",
  //     adminFeatures: true,
  //     firstname: "Erantha",
  //     lastname: "Welikala",
  //     email: "eranthawelikala@gmail.com",
  //     mobile: "+94775778979",
  //     units: ['Ll2jgq7nhZ30rxgs7ebq','N55sFZIQ7hL8OmdPXMNv','mvs0WABbqRTXIlDoh1Hc'],
  //     img_url: "https://firebasestorage.googleapis.com/v0/b/questionapp-42922.appspot.com/o/profilePictures%2F1569192345051_Teacher.jpg?alt=media&token=bd4dbe94-2d14-4f37-bde6-0e9b597fbac5",
  //     metadata: "",
  //     grade_level: ""
  //   }
  // }

  @Output() language: EventEmitter<any> = new EventEmitter();
  @Output() addTabItem: EventEmitter<any> = new EventEmitter();
  @Output() createPaperWidthEvent: EventEmitter<any> = new EventEmitter();
  @Output() loadPaperWithData: EventEmitter<any> = new EventEmitter();
  @Output() viewPaperRefresh: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public getLoggedInUser(){
    // return this.loggedInUser;
    return JSON.parse(sessionStorage.getItem("loggedInUser"));
  }

  public setLoggedInUser(user: {id: string, data: UserModel}){
    this.loggedInUser = user;
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  public languageRequest(language: string){
    this.language.emit({
      lang: language 
    })
  }

  public languageRespond(){
    return this.language;
  }

  public addTabItemRequest(data){
    this.addTabItem.emit({
      data: data 
    })
  }

  public addTabItemRespond(){
    return this.addTabItem;
  }

  public changeCreatePaperWidthRequest(){
    this.createPaperWidthEvent.emit({
      data: this.createPaperWidth
    })
  }
  
  public changeCreatePaperWidthRespond(){
    return this.createPaperWidthEvent
  }

  public loadPaperWithDataRequest(data: any){
    this.loadPaperWithData.emit({
      paper: data
    })
  }

  public loadPaperWithDataRespond(){
    return this.loadPaperWithData;
  }

  public viewPaperRefreshRequest(){
    this.viewPaperRefresh.emit()
  }

  public viewPaperRefreshRespond(){
    return this.viewPaperRefresh;
  }

}
