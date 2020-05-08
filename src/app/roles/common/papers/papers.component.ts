import { Component, OnInit, Input } from '@angular/core';
import { PaperService } from 'src/app/papers/paper.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaperModel } from 'src/app/papers/paper-model';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { PaperDetailsModalComponent } from 'src/app/papers/studentPaper/paperDetailsModal/paper-details-modal/paper-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  @Input() childMessage: string;
  
  private loggedInUser: {id: string, data: UserModel};
  public isStudent: boolean = false;

  public papers: {id: string, data: PaperModel}[] = [];
  public subjects: {id: string, data: SubjectModel}[] = [];

  constructor(
    private sharedService: SharedService,
    private paperService: PaperService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: NgbModal
    ) { 
      this.loggedInUser = this.sharedService.getLoggedInUser();
      this.loggedInUser.data.role=="student"? this.isStudent = true:"";
     }

  ngOnInit() {
    console.log(this.childMessage);
    this.spinnerService.show();
    this.paperService.getSubjects_PapersByInstructorEmail(this.childMessage, this);
  }

  public canAnswerPaper(subjectId: string){
    let result: boolean = false;
    let subject = this.loggedInUser.data.units.find(element => element == subjectId);
    subject != undefined? result = true: "";
    return result;
  }

  public loadPaper(paperInstance: {id: string, data: PaperModel}){    
    console.log("___loadPaper()___");
    let paper: {id: string, data: PaperModel} = paperInstance;
    let subject: {id: string, data: SubjectModel} = this.subjects.find(element => element.id == paper.data.subject);
    const modalRef = this.modalService.open(PaperDetailsModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.loggedInUser = this.loggedInUser;
    modalRef.componentInstance.paper = paper;
    modalRef.componentInstance.subjectName = subject.data.name;
    modalRef.componentInstance.instructorName = "";
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_ALL_PAPERS){
      console.log(data.payload);
      this.papers = data.payload.papers;
      this.subjects = data.payload.subjects;
      this.spinnerService.hide();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_ALL_PAPERS){
      this.spinnerService.hide();
    }
  }

}
