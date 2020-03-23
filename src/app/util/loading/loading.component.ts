import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  private message: string;
  private showLoading: boolean = false;

  constructor(private loadingService: LoadingService) { 
    console.log("Loaded");
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.loadingService.showLoadingRespond().subscribe(option => this.showLoadingPanel(option));
    this.loadingService.hideLoadingRespond().subscribe(() => this.hideLoadingPanel());
  }

  private showLoadingPanel(option: any){
    console.log("___showLoadingPanel()___");
    this.message = option.message;
    this.showLoading = true;
  }

  private hideLoadingPanel(){    
    console.log("___hideLoadingPanel()___");
    this.message = undefined;
    this.showLoading = false;
  }

}
