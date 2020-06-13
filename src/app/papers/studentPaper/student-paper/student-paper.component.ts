import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp, faRedo } from '@fortawesome/free-solid-svg-icons'
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { PaperModel } from '../../paper-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaperService } from '../../paper.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaperDetailsModalComponent } from '../paperDetailsModal/paper-details-modal/paper-details-modal.component';
import { MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-student-paper',
  templateUrl: './student-paper.component.html',
  styleUrls: ['./student-paper.component.scss']
})
export class StudentPaperComponent implements OnInit {

  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faRedo = faRedo;

  public showSubject: boolean = true;
  
  private loggedInUser: {id: string, data: UserModel};

  public subjectFilter: {id: string, data: SubjectModel};
  public sub_papers:{id: string, data: PaperModel, instructor: string}[];

  public subjectGroup: {id: string, data: SubjectModel}[] = [];
  private userGroup: {id: string, name: string}[] = [];
  private papers: {subject: string, papers:{id: string, data: PaperModel, instructor: string}[]}[];

  public displayedColumns: string[] = ['name', 'year', 'instructor', 'grade_level', 'load'];
  public mobileDisplayedColumns: string[] = ['name', 'year', 'instructor', 'grade_level'];
  dataSource: MatTableDataSource<{id: string, data: PaperModel, instructor: string}>;

  constructor(
    private sharedService: SharedService,
    private paperService: PaperService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
      this.loggedInUser = this.sharedService.getLoggedInUser();
     }

  ngOnInit() {
    this.spinnerService.show();
    this.commonService.getSubjectsAndInstructors(this);
    // this.paperService.getPapersBySubject(this.loggedInUser.data.units, this);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public toggleHide(){
    this.showSubject = !this.showSubject;
  }

  public refreshPapers(){
    this.spinnerService.show();
    this.subjectFilter = undefined;
    this.sub_papers = [];
    this.setDataSource();
    // this.paperService.getPapersBySubject(this.loggedInUser.data.units, this);
    this.papers = [];
    this.commonService.getSubjectsAndInstructors(this);
  }

  private setDataSource(){    
    this.dataSource = new MatTableDataSource(this.sub_papers);
    this.dataSource.filterPredicate = (data: {id: string, data: PaperModel, instructor: string}, filter: string) => {
      if(data.instructor!=undefined && (data.instructor).toLowerCase().includes(filter)){
        return true;
      }
    }
  }
  

  public filterPapersBySubject(){
    this.spinnerService.show();
    this.paperService.getPapersBySubject(this.subjectFilter.id, this);
  }

  public filterPapersBySubject_post(){
    console.log(this.subjectFilter);
    this.sub_papers = [];
    if(this.papers!=undefined){
      this.papers.forEach(el=>{
        console.log(el.subject);
        if(el.subject == this.subjectFilter.id){
          this.sub_papers = el.papers;
          console.log(el);
          this.setDataSource();
        }
        else{
          // nothing to do
        }
      });
    }
    console.log(this.sub_papers);
    this.spinnerService.hide();
  }

  public loadPaper(paperInstance: {id: string, data: PaperModel, instructor: string}){
    let paper: {id: string, data: PaperModel, instructor: string} = paperInstance;
    console.log("___loadPaper()___");
    let subject: {id: string, data: SubjectModel} = this.subjectGroup.find(element => element.id == paper.data.subject);
    const modalRef = this.modalService.open(PaperDetailsModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.loggedInUser = this.loggedInUser;
    modalRef.componentInstance.paper = paper;
    modalRef.componentInstance.subjectName = subject.data.name;
    modalRef.componentInstance.instructorName = paper.instructor;
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS_INSTRUCTORS){
      console.log(data.payload);
      this.userGroup = [];
      this.subjectGroup = [];
      this.userGroup = data.payload['instructors'];
      data.payload['subjects'].forEach(element => {
        this.loggedInUser.data.units.includes(element.id)? this.subjectGroup.push(element):"";
      });      
      this.spinnerService.hide();
      //this.paperService.getPapersBySubject(this.loggedInUser.data.units, this);
    }
    else if(serviceType == WsType.GET_ALL_PAPERS){
      console.log(data.payload);
      this.papers = data.payload;
      if(this.papers!=undefined){
        this.papers.forEach(element=>{
          element.papers.forEach(childElement=>{
            if(this.userGroup!=undefined){
              let instructor: {id: string, name: string} = this.userGroup.find(result => result.id == childElement.data.instructor);
              instructor!=undefined?childElement.instructor = instructor.name: "";
              console.log(instructor);
            }
          })
        })
      }
      this.filterPapersBySubject_post();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS_INSTRUCTORS){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.GET_ALL_PAPERS){
      this.spinnerService.hide();
    }
  }

}
