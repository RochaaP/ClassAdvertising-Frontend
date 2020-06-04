import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../service/share/data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from 'src/app/roles/roles.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-view-profile-institute',
  templateUrl: './view-profile-institute.component.html',
  styleUrls: ['./view-profile-institute.component.scss']
})
export class ViewProfileInstituteComponent implements OnInit {

  email: string;
  response: any;
  faEdit = faEdit;

  done = false;

  private instituteEmail: string;
  private studentEmail: string;

  showEditButton: boolean = false;
  sub: any;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
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
    this.viewDetailsInstitute(this.email);
  }

  viewDetailsInstitute(email: string) {
    this.done = false;
    this.spinnerService.show();
    this.rolesService.getInstitute(email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        console.log(this.response);
        this.done = true;
        // this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
      }

      else if (status.status === 400 || status.status === 0) {
        // this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      else {
        // this.openSnackBar(this.MESSAGE_FAIL);
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
    this.router.navigate(['/profile/institute/edit']);
  }

}
