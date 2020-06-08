import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar, MatRadioChange } from '@angular/material';
import { RolesService } from '../../roles.service';
import { DataService } from 'src/app/service/share/data.service';
import { Router } from '@angular/router';

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

  instructorDetails = [];
  instituteDetails = [];

  MESSAGE_WARNING = 'THIS MAY TAKE SOME TIME DEPENDING ON THE USERS COUNT, DO NOT USE THIS FREQUENTLY';
  MESSAGE_SUCCESS = 'ALL USERS UPDATED';
  MESSAGE_FAIL = 'GETTING ALL USERS FAILED';

  VERIFY_SUCCESS = 'USER VERIFIED, REFRESH PAGE AFTER ALL VERIFICATIONS ARE FINISHED TO GET UPDATES';
  VERIFY_FAIL = 'USER VERIFICATION FAILED';
  sub: any;

  searchInput: string;

  dataDone = false;

  notTriggeredClick: boolean;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.notTriggeredClick = true;
    this.openSnackBar(this.MESSAGE_WARNING);

    this.getAllUsers();
  }

  getAllUsers() {

    this.emptyLists();
    this.spinnerService.show();
    this.rolesService.getUsers();
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        console.log(this.response);
        this.separateRoles();
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
        this.getUsers();
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

  emptyLists() {
    this.allInstructor = [];
    this.allInstitute = [];
    this.allStudent = [];

    this.allVerifiedUsersInstructor = [];
    this.allVerifiedUsersInstitute = [];
    this.allVerifiedUsersStudent = [];

    this.allNotVerifiedUsersInstructor = [];
    this.allNotVerifiedUsersInstitute = [];
    this.allNotVerifiedUsersStudent = [];

    this.resultListInstructor = [];
    this.resultListInstitute = [];

    this.instructorDetails = [];
    this.instituteDetails = [];
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
        this.allVerifiedUsersInstructor.push(response);
      }
      else if (role === 'institute') {
        this.allVerifiedUsersInstitute.push(response);
      }
      else if (role === 'student') {
        this.allVerifiedUsersStudent.push(response);
      }
    }
    else{
      if (role === 'instructor') {
        this.allNotVerifiedUsersInstructor.push(response);
      }
      else if (role === 'institute') {
        this.allNotVerifiedUsersInstitute.push(response);
      }
      else if (role === 'student') {
        this.allNotVerifiedUsersStudent.push(this.response);
      }
    }
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

  viewProfileInstructor(email: string, firstname: string, lastName: string) {
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    const url = '/profile/instructor/view/' + firstname + ' ' + lastName;
    window.open(url, '_blank');
  }

  viewProfileInstitute(email: string, firstname: string, lastName: string) {
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    const url = '/profile/institute/view/' + firstname + ' ' + lastName;
    window.open(url, '_blank');
  }


  viewDetailsInstructor(email: string) {
    this.dataDone = false;
    this.spinnerService.show();
    this.rolesService.getInstructor(email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.instructorDetails = this.rolesService.getResponse();
        console.log(this.response);
        this.dataDone = true;
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

  viewDetailsInstitute(email: string) {
    this.dataDone = false;
    this.spinnerService.show();
    this.rolesService.getInstitute(email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.instituteDetails = this.rolesService.getResponse();
        console.log(this.response);
        this.dataDone = true;
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

  verifyUser(email: string) {
    this.spinnerService.show();
    this.rolesService.verifyUser(email);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.openSnackBar(this.VERIFY_SUCCESS);
        this.spinnerService.hide();
      }

      else if (status.status === 400 || status.status === 0) {
        this.openSnackBar(this.VERIFY_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.sub.unsubscribe();

    });
  }

  makeAdmin(id: string) {
    this.spinnerService.show();
    this.rolesService.makeAdmin(id);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.openSnackBar(this.VERIFY_SUCCESS);
        this.spinnerService.hide();
      }

      else if (status.status === 400 || status.status === 0) {
        this.openSnackBar(this.VERIFY_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.sub.unsubscribe();

    });
  }

  removeAdmin(id: string) {
    this.spinnerService.show();
    this.rolesService.removeAdmin(id);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.openSnackBar(this.VERIFY_SUCCESS);
        this.spinnerService.hide();
      }

      else if (status.status === 400 || status.status === 0) {
        this.openSnackBar(this.VERIFY_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.sub.unsubscribe();

    });
  }

  getUsers() {
    this.resultListInstructor = this.allInstructor;
    this.resultListInstitute = this.allInstitute;
  }

  getVerifiedUsers() {
    this.resultListInstructor = this.allVerifiedUsersInstructor;
    this.resultListInstitute = this.allVerifiedUsersInstitute;
  }

  getNonVerifiedUsers() {
    this.resultListInstructor = this.allNotVerifiedUsersInstructor;
    this.resultListInstitute = this.allNotVerifiedUsersInstitute;
  }


}
