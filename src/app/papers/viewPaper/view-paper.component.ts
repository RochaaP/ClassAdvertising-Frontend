import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faAsterisk, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PaperModel } from '../paper-model';
import { PaperService } from '../paper.service';
import { SharedService } from 'src/app/shared/shared.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-view-paper',
  templateUrl: './view-paper.component.html',
  styleUrls: ['./view-paper.component.scss']
})
export class ViewPaperComponent implements OnInit {

  faAsterisk = faAsterisk;
  faBars = faBars;
  faPlus = faPlus;

  private papers: {id: string, data: PaperModel}[];
  private displayedColumns: string[] = ['name', 'year', 'load'];

  private paper: PaperModel = {
      name: "Model Paper XX",
      year: "2019",
      instructor: "XXXXXXXXXX",
      subject: "XXXXXXXXXX",
      grade_level: "other",
      no_of_questions: 50,
      added_questions: 0,
      time: "60",
      questions: "",
      price: ""
  };

  constructor(private modalService: NgbModal, 
    private paperService: PaperService,
    private spinnerService: Ng4LoadingSpinnerService,
    private sharedService: SharedService) { }
  
  ngOnInit(): void {
    this.paperService.loadPapers(this);
    this.spinnerService.show();
  }

  public pickYear(){
    this.paper.year = this.paper.year.split("-")[0];
  }

  public loadData(res){
    this.papers = JSON.parse(JSON.stringify(res));
    console.log(this.papers);
  }

  public createPaper(modalName){
    console.log("___createPaper()___");
    this.modalService.open(modalName,{})
  }

  public loadPaper(paper: PaperModel){
    this.sharedService.loadPaperWithDataRequest(paper);
  }

  public savePaper(){
    this.spinnerService.show();
    this.paperService.addPaper(this.paper, this);
    this.modalService.hasOpenModals()? this.modalService.dismissAll(): "";
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_ALL_PAPERS){
      this.papers = data.payload;
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.CREATE_PAPER){
      this.spinnerService.hide();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_ALL_PAPERS){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.CREATE_PAPER){
      this.spinnerService.hide();
    }
  }

}
