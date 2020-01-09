import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { ThrowStmt } from '@angular/compiler';
import { MatRadioChange } from '@angular/material';


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

  allVerifiedUsersPerson = [];
  allVerifiedUsersInstitute = [];

  allNotVerifiedUsersPerson = [];
  allNotVerifiedUsersInstitute = [];

  searchedList = [];
  searchClicked: boolean;
  searchInput: string;
  firstNamePart: string;
  secondNamePart: string;

  showAllUsers: boolean;
  showVerifiedUsers: boolean;
  showNotVerifiedUsers: boolean;
  verifiedTriggered: boolean;
  notVerifiedTriggered: boolean;

  constructor(
    private http: HttpClient,
    private dataService: DataService
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
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIData() {
    return this.http.get('/api/getAllUsers');
  }
  triggered(email: string) {
      this.notTriggeredClick = false;
      this.email = email;
  }
  goBack() {
    this.notTriggeredClick = true;
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
    return this.http.post('/api/getAllUsers/verifyUser', {email : this.email});
  }

  search() {
    this.searchedList.splice(0, this.searchedList.length);
    if (this.searchInput) {
      this.searchClicked = true;
      if (this.searchInput.split(' ').length === 2) {
        this.secondNamePart = this.searchInput.split(' ')[1].toLowerCase();
        this.firstNamePart = this.searchInput.split(' ')[0].toLowerCase();
      }
      for (const index in this.response) {
        if (this.secondNamePart !== '' &&
        this.response[index].data.name.toLowerCase() === this.firstNamePart &&
        this.response[index].data.lastName.toLowerCase() === this.secondNamePart ) {
          this.searchedList.push(this.response[index]);
      }

        else if (this.response[index].data.name.toLowerCase() === this.searchInput.toLowerCase().trim() ||
           (this.response[index].data.registerItem === 'person' &&
            this.response[index].data.lastName.toLowerCase() === this.searchInput.toLowerCase().trim())) {
            this.searchedList.push(this.response[index]);
        }
      }
    }
  }

  searchClose() {
    this.searchedList.splice(0, this.searchedList.length);
    this.searchClicked = false;
    this.searchInput = '';
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
            else if (this.response[index].data.registerItem === 'person'){
              this.allNotVerifiedUsersInstitute.push(this.response[index]);
            }
          }
        }
      }
    }
  }
}
