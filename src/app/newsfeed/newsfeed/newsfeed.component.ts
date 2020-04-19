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

  firstReload: string;

  postsLength: number;
  pageSize: number;

  constructor(
    private http: HttpClient,
    public router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.firstReload = localStorage.getItem('needToReloadPage');
    if (this.firstReload) {
      window.location.reload();
      localStorage.removeItem('needToReloadPage');
    }
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
      this.postsLength = Object.keys(this.response).length;
      console.log('hi there this is for eng ' + this.postsLength);
      this.pageSize = 10;

    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.get('/api/posts/getPostsData/posts');
  }

  triggered(email: string, registerItem: string, name: string) {
    localStorage.setItem('emailtemp', email);
    localStorage.setItem('navigateUser', email);
    if (registerItem === 'person') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/person/' + name]);
    } 
    else if (registerItem === 'institute') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/institute/' + name]);
    }
    else if (registerItem === 'student') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/student/' + name]);
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
