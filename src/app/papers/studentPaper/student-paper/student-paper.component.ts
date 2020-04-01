import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { PaperModel } from '../../paper-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaperService } from '../../paper.service';
import { SubjectService } from 'src/app/subjects/subject.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { element } from 'protractor';

@Component({
  selector: 'app-student-paper',
  templateUrl: './student-paper.component.html',
  styleUrls: ['./student-paper.component.scss']
})
export class StudentPaperComponent implements OnInit {

  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  private buttonStatus: string = "Hide";
  private showSubject: boolean = true;
  
  private loggedInUser: {id: string, data: UserModel};

  private subjectFilter: string;
  private sub_papers:{id: string, data: PaperModel, subject: string}[];

  private subjectGroup: {id: string, data: SubjectModel}[] = [];
  private papers: {subject: string, papers:{id: string, data: PaperModel, subject: string}[]}[];
  private displayedColumns: string[] = ['name', 'year', 'grade_level', 'load'];

  constructor(
    private sharedService: SharedService,
    private paperService: PaperService,
    private subjectService: SubjectService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
      this.loggedInUser = this.sharedService.getLoggedInUser();
     }

  ngOnInit() {
    this.spinnerService.show();
    this.subjectService.getSubjects(this);
    // this.paperService.getPapersBySubject(this.loggedInUser.data.units, this);
  }

  private toggleHide(){
    this.showSubject = !this.showSubject;
  }

  private filterPapersBySubject(){
    console.log(this.subjectFilter);
    this.sub_papers = [];
    this.papers.forEach(el=>{
      console.log(el.subject);
      if(el.subject == this.subjectFilter){
        this.sub_papers = el.papers;
        console.log(el);
      }
      else{
        // nothing to do
      }
    });
    console.log(this.sub_papers);
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      console.log(data.payload);
      data.payload.forEach(element => {
        this.loggedInUser.data.units.includes(element.id)? this.subjectGroup.push(element):"";
      });
      this.paperService.getPapersBySubject(this.loggedInUser.data.units, this);
    }
    else if(serviceType == WsType.GET_ALL_PAPERS){
      console.log(data.payload);
      this.papers = data.payload;
      this.spinnerService.hide();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.GET_ALL_PAPERS){
      this.spinnerService.hide();
    }
  }

}
