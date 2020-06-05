import { Component, OnInit } from '@angular/core';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { SubjectService } from 'src/app/subjects/subject.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from 'src/app/roles/roles.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AttemptModel } from 'src/app/attempts/attempt-model';
import { AttemptsService } from 'src/app/attempts/attempts.service';
import { PaperModel } from 'src/app/papers/paper-model';
import { firestore } from 'firebase';

@Component({
  selector: 'app-view-profile-student',
  templateUrl: './view-profile-student.component.html',
  styleUrls: ['./view-profile-student.component.scss']
})
export class ViewProfileStudentComponent implements OnInit {

  faEdit = faEdit;

  showEditButton = false;

  subjectList: string[] = [];
  attemptList: {id: string, data: AttemptModel, paper: PaperModel}[] = [];
  response: any;
  email: string;
  studentEmail: string;

  sub: any;

  MESSAGE_FAIL = 'GETTING USER DETAILS FAILED';

  constructor(
    private subjectService: SubjectService,
    private rolesService: RolesService,
    private attemptService: AttemptsService,
    private authService: AuthenticationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('navigateUser');
    if (this.authService.isUserLoggedIn() != undefined) {
      this.studentEmail = this.authService.isUserLoggedIn().email;
      if (this.studentEmail === this.email) {
        this.showEditButton = true;
      }
    }
    else{
      // nothing to do
    }
    this.spinnerService.show();
    this.rolesService.getStudent(this.email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        this.subjectService.getSubjects(this);
        this.attemptService.getAttemptByUserId(this.response[0].id, this);
      }

      else if (status.status === 400 || status.status === 0) {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.sub.unsubscribe();

    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  clickProfile() {
    this.router.navigate(['/profile/student/edit']);
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      console.log(data.payload);
      let subjects: {id: string, data: SubjectModel}[] = data.payload;
      let registeredSubjectIdArray = this.response[0].data.units;
      if(subjects!=undefined){
        subjects.forEach(element => {
          if(registeredSubjectIdArray != undefined && registeredSubjectIdArray.length != 0){
            registeredSubjectIdArray.includes(element.id)? this.subjectList.push(element.data.name):"";
          }
        });
      }
    }
    else if(serviceType == WsType.GET_ATTEMPTS){
      if(data.payload!=undefined){
        this.attemptList = data.payload;
        console.log(this.attemptList);
      }
      this.spinnerService.hide();
    }
  }

  onFail(serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
    }
    else if(serviceType == WsType.GET_ATTEMPTS){
      this.spinnerService.hide();
    }
  }

}
