import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public viewPaperWidth = 20;
  public createPaperWidth = 75;
  public sidePanelWidth = 5;

  @Output() language: EventEmitter<any> = new EventEmitter();
  @Output() addTabItem: EventEmitter<any> = new EventEmitter();
  @Output() createPaperWidthEvent: EventEmitter<any> = new EventEmitter();
  @Output() loadPaperWithData: EventEmitter<any> = new EventEmitter();

  constructor() { }

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

}
