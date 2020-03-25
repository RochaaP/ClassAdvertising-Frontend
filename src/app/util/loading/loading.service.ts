import { Injectable, EventEmitter, Output } from '@angular/core';
import { WsType } from '../ws-type';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  @Output() showLoadingPanel: EventEmitter<any> = new EventEmitter();
  @Output() hideLoadingPanel: EventEmitter<any> = new EventEmitter();

  private loaderArray: WsType[] = []

  constructor() { }

  public showLoading(message: string, type: WsType){
    console.log("___showLoading()___");
    this.loaderArray.push(type);
    this.showLoadingPanel.emit({
      message: message
    });
  }

  public showLoadingRespond(){    
    console.log("___showLoadingRespond()___");
    return this.showLoadingPanel;
  }

  public hideLoading(type: WsType){  
    console.log("___hideLoading()___");
    this.loaderArray.splice(this.loaderArray.indexOf(type), 1);  
    if(this.loaderArray.length == 0){
      this.hideLoadingPanel.emit();
    }
  }

  public hideLoadingRespond(){
    console.log("___hideLoadingRespond()___")
    return this.hideLoadingPanel;
  }
}
