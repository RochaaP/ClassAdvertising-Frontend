import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.notTriggeredClick = true;
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

}
