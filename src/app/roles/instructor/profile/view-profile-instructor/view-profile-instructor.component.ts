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

@Component({
  selector: 'app-view-profile-instructor',
  templateUrl: './view-profile-instructor.component.html',
  styleUrls: ['./view-profile-instructor.component.scss']
})
export class ViewProfileInstructorComponent implements OnInit {

  faEdit = faEdit;

  loggedInUser: {id: string, data: UserModel};

  email: string;
  response: any;

  instructorEmail: string;
  studentEmail: string;

  topic: string;
  description: string;
  result: any;
  isFor: string;

  showAppointmentButton: boolean;
  showEditButton: boolean = false;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) {
   }

  ngOnInit() {

    // this.data.currentEmail.subscribe(message => this.email = message);
    // if (!this.email) {
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
    // }

    // this.email = localStorage.getItem('emailtemp');
    // console.log("hereh here" +this.email);
    // if (localStorage.getItem('emailtemp') && (this.email)) {
    //   this.email = localStorage.getItem('emailtemp');
    //   console.log("hearaer on hahd", this.email)

    // }

      this.getAPIData().subscribe((response) => {
      console.log('response from get user details ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIData() {
    return this.http.post('/api/userDetails/instructor/get', {email: this.email} );
  }

  // appointment() {
  //   this.data.passEmail(this.email);
  //   this.router.navigate(['/messages']);
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: {topic: this.topic, description: this.description, isFor: 'instructor'}
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
      data: {topic: this.result.topic, description: this.result.description,  isFor: 'instructor'}
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
      // content: this.content,
      topic: this.result.topic,
      description: this.result.description,
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
      description: this.result.description,
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
