import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../service/share/data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-view-profile-institute',
  templateUrl: './view-profile-institute.component.html',
  styleUrls: ['./view-profile-institute.component.scss']
})
export class ViewProfileInstituteComponent implements OnInit {

  email: string;
  response: any;

  private instituteEmail: string;
  private studentEmail: string;

  showEditButton: boolean = false;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.data.currentEmail.subscribe(message => this.email = message);
    if (!this.email) {
      this.email = localStorage.getItem('navigateUser');
      this.instituteEmail = this.email;
      if (this.authService.isUserLoggedIn() != undefined) {
        this.studentEmail = this.authService.isUserLoggedIn().email;
        if (this.studentEmail === this.instituteEmail) {
          this.showEditButton = true;
        }
      }
      else{
        // nothing to do
      }
    }

    console.log('this is from insti profile ' + this.email);
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  clickProfile() {
    this.router.navigate(['/profile/institute/edit']);
  }

  getAPIData() {
    return this.http.post('/api/userDetails/institute/get', {email: this.email} );
  }


}
