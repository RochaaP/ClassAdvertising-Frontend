import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { ThrowStmt } from '@angular/compiler';

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

  searchedList = [];
  searchClicked: boolean;
  searchInput: string;

  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.notTriggeredClick = true;
    this.searchClicked = false;

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
    if (this.searchInput !== '') {
      this.searchClicked = true;
      for (const index in this.response) {
        if (this.response[index].data.name.toLowerCase() === this.searchInput[0].toLowerCase() ||
           (this.response[index].data.registerItem === 'person' &&
            this.response[index].data.lastName.toLowerCase() === this.searchInput.toLowerCase())) {
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

}
