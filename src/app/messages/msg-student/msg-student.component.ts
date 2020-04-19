import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../service/share/data.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { ThrowStmt } from '@angular/compiler';

export interface DialogData {
  topic: string;
  description: string;
}

@Component({
  selector: 'app-msg-student',
  templateUrl: './msg-student.component.html',
  styleUrls: ['./msg-student.component.scss']
})
export class MsgStudentComponent implements OnInit {

  instructorEmail: string;
  studentEmail: string;

  topic: string;
  description: string;
  result: any;
  content: any;
  response: any;
  value: any;
  responseList = [];
  moreDetails: any;
  numbers: number;

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.data.currentEmail.subscribe(message => this.instructorEmail = message);
    this.studentEmail = this.authService.isUserLoggedIn().email;
    this.getMessages();
    this.numbers = 0;
    // this.openDialog();
  }

  getMessages() {
    this.getAPIData().subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
      this.value = this.response[0].data.content;
      
      console.log(response);
    });
  }
  getAPIData() {
    return this.http.post('api/appointments/getAppointments/student',  {email: this.studentEmail});
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {topic: this.topic, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.result = result;
       this.openConfirmation();
     }
    //  console.log('from null '+result);
    });
  }

  openConfirmation(): void {
    const dialogConf = this.dialog.open(ConfirmationComponent, {
      data: {topic: this.result.topic, description: this.result.description}
    });

    dialogConf.afterClosed().subscribe(result => {
      if (result) {
        this.postData();
      }
    });
  }

  postData() {
    let userValues = {};

    userValues = {
      instructorEmail: this.instructorEmail,
      // content: this.content,
      topic: this.result.topic,
      description: this.result.description,
      studentEmail: this.studentEmail
    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
    });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/appointments/makeAppointment/student', userValues);
  }

  details(index: number) {
   this.numbers = index;
  }

}

