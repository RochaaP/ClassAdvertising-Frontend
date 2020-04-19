import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { ThrowStmt } from '@angular/compiler';
import { MatRadioChange } from '@angular/material';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  response: any;
  notTriggeredClick: boolean;
  email: string;
  verifiedif: boolean;

  allInstructor = [];
  allInstitute = [];

  allVerifiedUsersInstructor = [];
  allVerifiedUsersInstitute = [];

  allNotVerifiedUsersInstructor = [];
  allNotVerifiedUsersInstitute = [];

  searchedInstructorList = [];
  searchedInstituteList = [];
  searchClicked: boolean;
  searchInput: string;
  firstNamePart: string;
  secondNamePart: string;

  showAllUsers: boolean;
  showVerifiedUsers: boolean;
  showNotVerifiedUsers: boolean;
  verifiedTriggered: boolean;
  notVerifiedTriggered: boolean;

  instructorClicked: boolean;
  instituteClicked: boolean;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    // private location: Location
  ) { }

  ngOnInit() {
    this.notTriggeredClick = true;
    this.searchClicked = false;
    this.showAllUsers = true;
    this.verifiedTriggered = false;
    this.notVerifiedTriggered = false;

    this.getAPIData().subscribe((response) => {
      console.log('response with all users ', response);
      this.response = response;
      for (const index in this.response) {
        if (this.response[index].data.registerItem === 'instructor') {
          this.allInstructor.push(this.response[index]);
        }
        else if (this.response[index].data.registerItem === 'institute') {
          this.allInstitute.push(this.response[index]);
        }
      }
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  // backClicked() {
  //   this.location.back();
  // }

  getAPIData() {
    return this.http.get('/api/userDetails/common/getAll');
  }
  triggeredInstructor(email: string) {
    this.notTriggeredClick = false;
    this.email = email;
    this.instructorClicked = true;
    this.instituteClicked = false;
  }
  triggeredInstitute(email: string) {
    this.notTriggeredClick = false;
    this.email = email;
    this.instructorClicked = false;
    this.instituteClicked = true;
  }
  goBack() {
    this.notTriggeredClick = true;
    // this.location.back();
  }
  verify() {
    this.postAPIData().subscribe((response) => {
      console.log('response what response ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  postAPIData() {
    return this.http.post('/api/admin/verify', {email : this.email});
  }

  search() {
    this.searchedInstructorList.splice(0, this.searchedInstructorList.length);
    this.searchedInstituteList.splice(0, this.searchedInstituteList.length);

    if (this.searchInput) {
      this.searchClicked = true;
      // for (const val in this.allInstructor) {
      //   if (this.allInstructor[val].data.name )
      // }
      if (this.searchInput.split(' ').length === 2) {
        this.secondNamePart = this.searchInput.split(' ')[1].toLowerCase();
        this.firstNamePart = this.searchInput.split(' ')[0].toLowerCase();
      }
      for (const index in this.allInstructor) {
        if (this.secondNamePart !== '' &&
        this.allInstructor[index].data.name.toLowerCase() === this.firstNamePart &&
        this.allInstructor[index].data.lastName.toLowerCase() === this.secondNamePart ) {
          this.searchedInstructorList.push(this.allInstructor[index]);
      }

        else if (this.allInstructor[index].data.name.toLowerCase() === this.searchInput.toLowerCase().trim() ||
           (this.allInstructor[index].data.lastName.toLowerCase() === this.searchInput.toLowerCase().trim())) {
            this.searchedInstructorList.push(this.allInstructor[index]);
        }
      }

      for (const index in this.allInstitute) {
        if (this.allInstitute[index].data.name.toLowerCase() === this.searchInput.toLowerCase().trim() ) {
          this.searchedInstituteList.push(this.allInstitute[index]);
        }
      }
    }
  }

  searchClose(el: HTMLElement) {
    this.searchedInstructorList.splice(0, this.searchedInstructorList.length);
    this.searchClicked = false;
    this.searchInput = '';
  }

  viewInstitute(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  event(event: MatRadioChange) {
    if (event.value === 'allUsers') {
      this.showAllUsers = true;
      this.showVerifiedUsers = false;
      this.showNotVerifiedUsers = false;
      // this.showByName = false;
    }
    else if (event.value === 'verifiedUsers') {

      this.showAllUsers = false;
      this.showVerifiedUsers = true;
      this.showNotVerifiedUsers = false;

      if (!this.verifiedTriggered) {
        this.verifiedTriggered = true;
        for (const index in this.response) {
          // if you are upgrading this please change this to better way
          if (this.response[index].data.verify === 'assets/verification/verified.png') {
            if (this.response[index].data.registerItem === 'instructor') {
              this.allVerifiedUsersInstructor.push(this.response[index]);
            }
            else if (this.response[index].data.registerItem === 'institute'){
              this.allVerifiedUsersInstitute.push(this.response[index]);
            }
          }
        }
      }
    }

    else if (event.value === 'notVerifiedUsers') {

      this.showAllUsers = false;
      this.showVerifiedUsers = false;
      this.showNotVerifiedUsers = true;
      if (!this.notVerifiedTriggered) {
        this.notVerifiedTriggered = true;
        for (const index in this.response) {
          // if you are upgrading this please change this to better way
          if (this.response[index].data.verify === 'assets/verification/not_verified.png') {
            if (this.response[index].data.registerItem === 'instructor'){
              this.allNotVerifiedUsersInstructor.push(this.response[index]);
            }
            else if (this.response[index].data.registerItem === 'institute'){
              this.allNotVerifiedUsersInstitute.push(this.response[index]);
            }
          }
        }
      }
    }
  }
}
