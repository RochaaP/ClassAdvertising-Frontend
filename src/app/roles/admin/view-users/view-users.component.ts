import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar, MatRadioChange } from '@angular/material';
import { RolesService } from '../../roles.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  response: any;

  allInstructor = [];
  allInstitute = [];
  allStudent = [];

  allVerifiedUsersInstructor = [];
  allVerifiedUsersInstitute = [];
  allVerifiedUsersStudent = [];

  allNotVerifiedUsersInstructor = [];
  allNotVerifiedUsersInstitute = [];
  allNotVerifiedUsersStudent = [];

  resultListInstructor = [];
  resultListInstitute = [];

  MESSAGE_SUCCESS = 'ALL USERS UPDATED';
  MESSAGE_FAIL = 'GETTING ALL USERS FAILED';
  sub: any;

  searchInput: string;
  


  notTriggeredClick: boolean;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.notTriggeredClick = true;

    this.getAllUsers();
  }

  getAllUsers() {
    this.spinnerService.show();
    this.rolesService.getUsers();
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        console.log(this.response);
        this.separateRoles();
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

  separateRoles() {
    for (const index in this.response) {
      if (this.response[index].data.role === 'instructor') {
        this.allInstructor.push(this.response[index]);
        this.separateVerification(this.response[index], 'instructor');
      }
      else if (this.response[index].data.role === 'institute') {
        this.allInstitute.push(this.response[index]);
        this.separateVerification(this.response[index], 'institute');

      }
      else if (this.response[index].data.role === 'student') {
        this.allStudent.push(this.response[index]);
        this.separateVerification(this.response[index], 'student');

      }
    }
  }

  separateVerification(response: any, role: string) {
    if (response.data.verify === 'assets/verification/verified.png') {
      if (role === 'instructor') {
        this.allVerifiedUsersInstructor.push(this.response);
      }
      else if (role === 'institute') {
        this.allVerifiedUsersInstitute.push(this.response);
      }
      else if (role === 'student') {
        this.allVerifiedUsersStudent.push(this.response);
      }
    }
    else{
      if (role === 'instructor') {
        this.allNotVerifiedUsersInstructor.push(this.response);
      }
      else if (role === 'institute') {
        this.allNotVerifiedUsersInstitute.push(this.response);
      }
      else if (role === 'student') {
        this.allNotVerifiedUsersStudent.push(this.response);
      }
    }
  }

  event(event: MatRadioChange) {
    if (event.value === 'allUsers') {
      this.resultListInstructor = this.allInstructor;
      this.resultListInstitute = this.allInstitute;
    }

    else if (event.value === 'verifiedUsers') {
      this.resultListInstructor = this.allInstructor;
      this.resultListInstitute = this.allInstitute;
    }

    else if (event.value === 'notVerifiedUsers') {
      this.resultListInstructor = this.allInstructor;
      this.resultListInstitute = this.allInstitute;

    }
  }

  triggeredInstructor(email: string) {
    console.log('triggereed / implemetn this')
  }
  triggeredInstitute(email: string) {
    console.log('triggereed / implemetn this')
  }

  search() {
    console.log('search triggered/ implement this.')
  }
  searchClose() {
    console.log('searchClose triggered / implement this.')
  }
  filterItems(input: string) {
    console.log('filterItems triggered / implement this.')
  }
}
