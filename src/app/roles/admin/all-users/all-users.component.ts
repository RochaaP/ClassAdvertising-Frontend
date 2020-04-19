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

  allPerson = [];
  allInstitute = [];

  allVerifiedUsersPerson = [];
  allVerifiedUsersInstitute = [];

  allNotVerifiedUsersPerson = [];
  allNotVerifiedUsersInstitute = [];

  searchedPersonList = [];
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

  personClicked: boolean;
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
        if (this.response[index].data.registerItem === 'person') {
          this.allPerson.push(this.response[index]);
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
  triggeredPerson(email: string) {
    this.notTriggeredClick = false;
    this.email = email;
    this.personClicked = true;
    this.instituteClicked = false;
  }
  triggeredInstitute(email: string) {
    this.notTriggeredClick = false;
    this.email = email;
    this.personClicked = false;
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
    this.searchedPersonList.splice(0, this.searchedPersonList.length);
    this.searchedInstituteList.splice(0, this.searchedInstituteList.length);

    if (this.searchInput) {
      this.searchClicked = true;
      // for (const val in this.allPerson) {
      //   if (this.allPerson[val].data.name )
      // }
      if (this.searchInput.split(' ').length === 2) {
        this.secondNamePart = this.searchInput.split(' ')[1].toLowerCase();
        this.firstNamePart = this.searchInput.split(' ')[0].toLowerCase();
      }
      for (const index in this.allPerson) {
        if (this.secondNamePart !== '' &&
        this.allPerson[index].data.name.toLowerCase() === this.firstNamePart &&
        this.allPerson[index].data.lastName.toLowerCase() === this.secondNamePart ) {
          this.searchedPersonList.push(this.allPerson[index]);
      }

        else if (this.allPerson[index].data.name.toLowerCase() === this.searchInput.toLowerCase().trim() ||
           (this.allPerson[index].data.lastName.toLowerCase() === this.searchInput.toLowerCase().trim())) {
            this.searchedPersonList.push(this.allPerson[index]);
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
    this.searchedPersonList.splice(0, this.searchedPersonList.length);
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
            if (this.response[index].data.registerItem === 'person') {
              this.allVerifiedUsersPerson.push(this.response[index]);
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
            if (this.response[index].data.registerItem === 'person'){
              this.allNotVerifiedUsersPerson.push(this.response[index]);
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
