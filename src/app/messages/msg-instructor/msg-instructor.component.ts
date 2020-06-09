import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../service/share/data.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MessagesService } from '../messages.service';
import { MatSnackBar } from '@angular/material';

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

  sub: any;

  MESSAGE_SUCCESS = 'SUBJECTS UPDATED';
  MESSAGE_FAIL = 'GETTING SUBJECTS FAILED';

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthenticationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private messagesService: MessagesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.instructorEmail = this.authService.isUserLoggedIn().email;
    this.getMessages();
    this.mainIndex = 0;
    this.subIndex = 0;
  }

  getMessages() {
    this.spinnerService.show();
    this.messagesService.getMessages(this.instructorEmail);
    this.sub = this.messagesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.messagesService.getResponse();
        this.openSnackBar(this.MESSAGE_SUCCESS);
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


  reply(): void {
    const length = this.response[this.mainIndex].data.content.length;
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {
        topic: this.response[this.mainIndex].data.content[length - 1].topic,
        name: this.response[this.mainIndex].data.nameStu,
        from: 'instructor'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.result = result;
       this.openConfirmation();

     }
    });
  }

  openConfirmation(): void {
    const dialogConf = this.dialog.open(ConfirmationComponent, {
      data: {
        name: this.result.name,
        topic: this.result.topic,
        description: this.result.description,
        selected: this.result.selected,
        selectedTime: this.result.selectedTime,
        date: this.result.date,
        time: this.result.time,
        link: this.result.link,
        from: 'instructor',
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

