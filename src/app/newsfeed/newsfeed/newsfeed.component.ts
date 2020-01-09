import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../service/share/data.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  firstName: string;
  lastName: string;
  name: string;
  create: Date;
  postURL: string;
  description: string;
  response: any;
  message: string;

  constructor(
    private http: HttpClient,
    public router: Router,
    private data: DataService
  ) { }

  ngOnInit() {

    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.get('/api/getPostsData/posts');
  }

  triggered(email: string, registerItem: string, name: string) {
    if (registerItem === 'person') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/person/' + name]);
    } else if (registerItem === 'institute') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/institute/' + name]);
    }
  }

  personDetails(response) {
    this.firstName = response.firstName;
    this.lastName = response.lastName;
    this.postURL = response.profileImagePath;
    this.description = response.description;
  }

  instituteDetails(response) {
    this.name = response.name;
    this.postURL = response.profileImagePath;
    this.description = response.description;
  }
}
