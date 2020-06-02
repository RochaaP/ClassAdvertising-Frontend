import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../../service/share/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../../messages/dialog/dialog.component';
import { ConfirmationComponent } from '../../../../messages/confirmation/confirmation.component';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Time } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from 'src/app/roles/roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-profile-instructor',
  templateUrl: './view-profile-instructor.component.html',
  styleUrls: ['./view-profile-instructor.component.scss']
})
export class ViewProfileInstructorComponent implements OnInit {

  faEdit = faEdit;

  done = false;

  loggedInUser: {id: string, data: UserModel};

  email: string;
  response: any;

  instructorEmail: string;
  studentEmail: string;

  topic: string;
  description: string;
  subject: string;
  grade: string;
  date: string;
  time: Time;
  result: any;
  isFor: string;

  showAppointmentButton: boolean;
  showEditButton = false;
  sub: any;

  MESSAGE_FAIL = 'GETTING USER DETAILS FAILED';

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar
  ) {
   }

  ngOnInit() {
    this.email = localStorage.getItem('navigateUser');
    this.instructorEmail = this.email;
    if (this.authService.isUserLoggedIn() != undefined) {
      this.studentEmail = this.authService.isUserLoggedIn().email;
      this.showAppointmentButton = true;
      if (this.studentEmail === this.instructorEmail) {
        this.showAppointmentButton = false;
        this.showEditButton = true;
      }
    }
    else{
      this.showAppointmentButton = false;
    }
    console.log('email from local storage '+ this.email + '  ' +this.studentEmail);


    this.spinnerService.show();
    this.rolesService.getInstructor(this.email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        this.done = true;
        this.spinnerService.hide();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        firstname: this.response[0].data.firstname,
        lastname: this.response[0].data.lastname,
        topic: this.topic,
        subject: this.subject,
        grade: this.grade,
        description: this.description,
        data: this.date,
        time: this.time,
        from: 'student'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.result = result;
       this.openConfirmation();
     }
    //  console.log('from null '+result);
    });
  }

  clickProfile() {
    this.router.navigate(['/profile/instructor/edit']);
  }

  openConfirmation(): void {
    const dialogConf = this.dialog.open(ConfirmationComponent, {
      data: {
        firstname: this.response[0].data.firstname,
        lastname: this.response[0].data.lastname,
        topic: this.result.topic,
        subject: this.result.subject,
        grade: this.result.grade,
        date: this.result.date,
        time: this.result.time,
        description: this.result.description,
        from: 'student'
      }
    });

    dialogConf.afterClosed().subscribe(result => {
      if (result) {
        // this.postData();
        this.makeAppointment();
      }
    });
  }

  postData() {
    let userValues = {};

    // this.content = {
    //   topic: this.result.topic,
    //   description: this.result.description,
    //   email: this.email
    // };

    userValues = {
      instructorEmail: this.instructorEmail,
      content: this.result,
      // description: this.result.description,
      studentEmail: this.studentEmail
    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from appointments ', response);
      this.response = response;
    });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/appointments/makeAppointment', userValues);
  }

  makeAppointment() {
    let userValues = {};
    let content1 = {};
    content1 = {
      topic: this.result.topic,
      subject: this.result.subject,
      grade: this.result.grade,
      date: this.result.date,
      time: this.result.time,
      description: this.result.description,
      from: this.result.from

    };

    userValues = {
      instructorEmail: this.instructorEmail,
      content: content1,
      studentEmail: this.studentEmail
    };

    console.log(userValues)

    this.postAppointmentData(userValues).subscribe((response) => {
      console.log('response from appointments ', response);
      this.response = response;
    });
  }

  postAppointmentData(userValues: object) {
    return this.http.post('api/temp/appointments/makeAppointment', userValues);
  }

}
