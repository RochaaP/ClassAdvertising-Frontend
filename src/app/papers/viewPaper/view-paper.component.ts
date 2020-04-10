import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faAsterisk, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PaperModel } from '../paper-model';
import { PaperService } from '../paper.service';
import { SharedService } from 'src/app/shared/shared.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserModel } from 'src/app/users/user-model';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { SubjectService } from 'src/app/subjects/subject.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreatePaperComponent } from '../createPaper/create-paper/create-paper.component';

@Component({
  selector: 'app-view-paper',
  templateUrl: './view-paper.component.html',
  styleUrls: ['./view-paper.component.scss']
})
export class ViewPaperComponent implements OnInit {

  faAsterisk = faAsterisk;
  faPlus = faPlus;

  private isSubmitted: boolean = false;

  private subjectGroup: {id: string, data: SubjectModel}[] = [];

  private loggedInUser: {id: string, data: UserModel};

  private papers: {id: string, data: PaperModel, subject: string}[];
  private created_date: string = null;
  private displayedColumns: string[] = ['name', 'subject', 'year', 'load'];

  private paper: PaperModel;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal, 
    private paperService: PaperService,
    private subjectService: SubjectService,
    private spinnerService: Ng4LoadingSpinnerService,
    private sharedService: SharedService) { 
      this.loggedInUser = this.sharedService.getLoggedInUser();
      this.createDummyPaper();
    }
  
  ngOnInit(): void {
    this.spinnerService.show();
    this.paperService.getPapersByInstructorId(this.loggedInUser.id, this);
    this.sharedService.viewPaperRefreshRespond().subscribe(()=>{
      this.refresh();
    })
  }

  form = this.fb.group({
    name: ["", [Validators.required]],
    year: ["", [Validators.required]],
    grade_level: ["", [Validators.required]],
    no_of_questions: ["", [Validators.required]],
    time: ["", [Validators.required]],
    subject: ["", [Validators.required]]
  })

  // get f() { return this.form.controls }
  formControls = this.form.controls;

  // Create a dummy paper
  public createDummyPaper(){
    this.paper = {
      name: "Model Paper XX",
      year: null,
      instructor: this.loggedInUser.id,
      subject: null,
      grade_level: null,
      no_of_questions: 50,
      added_questions: 0,
      time: "60",
      questions: "",
      price: ""
    };
  }

  // Will refresh the paper list
  public refresh(){
    this.spinnerService.show();
    this.createDummyPaper();
    this.paperService.getPapersByInstructorId(this.loggedInUser.id, this);
    this.spinnerService.show();
    this.subjectService.getSubjectsAndInstructors(this);
  }

  // Year will be extracted from the selected date
  public pickYear(){
    this.paper.year = this.created_date.split("-")[0];
  }

  // Will open the Create Paper modal
  public createPaper(){
    console.log("___createPaper()___");
    // this.modalService.open(modalName,{})
    const modalRef = this.modalService.open(CreatePaperComponent);
    modalRef.componentInstance.paper = this.paper;
    modalRef.componentInstance.subjectGroup = this.subjectGroup;
  }

  public loadPaper(paper: PaperModel){
    this.sharedService.loadPaperWithDataRequest(paper);
  }

  // Will save the created paper
  public savePaper(){
    if(this.form.invalid){
      return;
    }
    else{
      // nothing to do
    }
    this.spinnerService.show();
    this.paperService.addPaper(this.paper, this);
    this.modalService.hasOpenModals()? this.modalService.dismissAll(): "";
    this.refresh();
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_ALL_PAPERS){
      console.log(data.payload);
      this.papers = data.payload;    
      this.subjectService.getSubjectsAndInstructors(this);
    }
    else if(serviceType == WsType.GET_SUBJECTS){
      console.log(data.payload);
      let subjects: {id: string, data: SubjectModel}[] = data.payload['subjects'];
      subjects.forEach(element => {
        this.loggedInUser.data.units.includes(element.id)? this.subjectGroup.push(element):"";
        this.papers.forEach(paper_el => {
          element.id == paper_el.data.subject? paper_el.subject = element.data.name: ""
        });
      });
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
    else if(serviceType == WsType.GET_SUBJECTS){
      this.spinnerService.hide();
    }
    else if(serviceType == WsType.CREATE_PAPER){
      this.spinnerService.hide();
    }
  }

}
