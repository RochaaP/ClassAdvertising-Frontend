import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PaperModel } from '../../paper-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaperService } from '../../paper.service';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { ViewPaperComponent } from '../../viewPaper/view-paper.component';
import { WsCallback } from 'src/app/util/ws-callback';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';

@Component({
  selector: 'app-create-paper',
  templateUrl: './create-paper.component.html',
  styleUrls: ['./create-paper.component.scss']
})
export class CreatePaperComponent implements OnInit {

  faAsterisk = faAsterisk;

  @Input("paper") paper: PaperModel;
  @Input("subjectGroup") subjectGroup: {id: string, data: SubjectModel}[] = [];
  
  public created_date: string = null;

  public isSubmitted: boolean = false;
  public disableSaveBtn: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private paperService: PaperService,
    private sharedService: SharedService) { }

  ngOnInit() {
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

  // Year will be extracted from the selected date
  public pickYear(){
    this.paper.year = this.created_date.split("-")[0];
  }

  // Will save the created paper
  public savePaper(){
    if(this.form.invalid){
      this.disableSaveBtn = false;
      return;
    }
    else{
      // nothing to do
    }
    this.spinnerService.show();
    this.paperService.addPaper(this.paper, this);
    this.activeModal.dismiss();
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.CREATE_PAPER){
      this.sharedService.viewPaperRefreshRequest();
      this.spinnerService.hide();
      this.activeModal.dismiss();
    }
  }

  onFail(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.CREATE_PAPER){
      this.spinnerService.hide();
    }
  }

}
