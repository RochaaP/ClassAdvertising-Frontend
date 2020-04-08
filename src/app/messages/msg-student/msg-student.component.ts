import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../service/share/data.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

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

  email: string;
  userEmail: string;

  topic: string;
  description: string;
  result: any;
  content: any;
  response: any;

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.data.currentEmail.subscribe(message => this.email = message);
    this.userEmail = this.authService.isUserLoggedIn().email;
    this.getMessages();
    // if (!this.email) {
    //   this.email = localStorage.getItem('navigateUser');
    // }
    console.log(this.userEmail);
  }
  
  getMessages() {
    this.getAPIData().subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
      console.log(response);
    });
  }
  getAPIData() {
    return this.http.post('api/getAppointments',  {email: this.userEmail});
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
  
    // this.content = {
    //   topic: this.result.topic,
    //   description: this.result.description,
    // };

    console.log('this.eamil '+this.email)
    userValues = {
      email: this.email,
      // content: this.content,
      topic: this.result.topic,
      description: this.result.description,
      userEmail: this.userEmail
    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
    });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/makeAppointment', userValues);
  }


}

