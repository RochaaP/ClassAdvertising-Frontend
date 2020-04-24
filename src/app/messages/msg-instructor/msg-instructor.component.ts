import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../service/share/data.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-msg-instructor',
  templateUrl: './msg-instructor.component.html',
  styleUrls: ['./msg-instructor.component.scss']
})
export class MsgInstructorComponent implements OnInit {

  instructorEmail: string;
  studentEmail: string;

  topic: string;
  description: string;
  isFor: string;
  result: any;
  content: any;
  response: any;
  value: any;
  responseList = [];
  moreDetails: any;
  mainIndex: number;
  subIndex: number;

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    // this.data.currentEmail.subscribe(message => this.instructorEmail = message);
    this.instructorEmail = this.authService.isUserLoggedIn().email;
    // this.getMessages();
    this.getTempMessages();
    this.mainIndex = 0;
    this.subIndex = 0;
    // this.openDialog();
  }

  getMessages() {
    this.getAPIData().subscribe((response) => {
      console.log('response from msg inst/', response);
      this.response = response;
      this.value = this.response[0].data.content;

      // console.log('msgInst / get message' , response[0].data);
    });
  }
  getAPIData() {
    return this.http.post('api/appointments/getAppointments/instructor',  {email: this.instructorEmail});
  }

  getTempMessages() {

  this.getTempMsgData().subscribe((response) => {
        console.log('response from msg inst/', response);
        this.response = response;
        // this.value = this.response[0].data.content;

        // console.log('msgInst / get message' , response[0].data);
      });
    }
  getTempMsgData() {
    return this.http.post('api/temp/appointments/getAppointments/instructor',  {email: this.instructorEmail});
  }


  reply(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        topic: this.response[this.mainIndex].data.content[this.subIndex].topic,
        isFor: 'replyFromInstructor'
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

  openConfirmation(): void {
    const dialogConf = this.dialog.open(ConfirmationComponent, {
      data: {
        topic: this.result.topic,
        description: this.result.description,
        selected: this.result.selected,
        isFor: 'replyFromInstructor',
        link: this.result.link
      }
    });

    dialogConf.afterClosed().subscribe(result => {
      if (result) {
        this.postTempData();
      }
    });
  }

  postData() {
    let userValues = {};
    console.log(this.result);

    userValues = {
      instructorEmail: this.instructorEmail,
      content: this.result,
      // studentEmail: this.response[0].data.content[this.numbers].email

    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
    });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/appointments/makeAppointment/instructor/reply', userValues);
  }


  postTempData() {
    let userValues = {};
    console.log(this.result);

    userValues = {
      id: this.response[this.mainIndex].id,
      instructorEmail: this.instructorEmail,
      content: this.result,
      // studentEmail: this.response[0].data.content[this.numbers].email

    };

    this.postTempMsgData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
    });
  }

  postTempMsgData(userValues: object) {
    return this.http.post('api/temp/appointments/makeAppointment/instructor/reply', userValues);
  }

  details(index: number, subIndex: number) {
    this.mainIndex = index;
    this.subIndex = subIndex;
    this.value = this.response[this.mainIndex].data.content[subIndex];
    console.log('index', index, ' subIndex', subIndex);
  }

}

