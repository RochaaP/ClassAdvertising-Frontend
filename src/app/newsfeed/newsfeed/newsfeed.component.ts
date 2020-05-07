import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../service/share/data.service';
import { timeout, retry, catchError } from 'rxjs/operators';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { InfiniteScroll } from '../../service/scrollable/infinite-scroll.directive';
// import { PaginationService } from './papination.service';

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
  temp: any;

  firstReload: string;

  postsLength: number;
  pageSize: number;
  pageLimit: number;
  pageCount: number;
  moreNextPosts: boolean;
  morePreviousPosts: boolean;

  MESSAGE_NO_POSTS = 'You have reached to the end';

  constructor(
    private http: HttpClient,
    public router: Router,
    private data: DataService,
    private notificationBarService: NotificationBarService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.pageCount = 0;
    this.pageLimit = 25;
    this.moreNextPosts = true;
    this.morePreviousPosts = false;


    this.notificationBarService.create({
                          message: 'Welcome to mtute.lk.. Enjoy..',
                          type: NotificationType.Warning,
                          autoHide: true,
                          hideDelay: 5000,
                          hideOnHover: false,
                          allowClose: true});
   
    this.getAPIDataw().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
      this.postsLength = Object.keys(this.response).length;
      console.log('hi there this is for eng ' + this.postsLength);
      
    }, ( error) => {
      console.log('error is ', error);
    });

  }
  getAPIDataw() {
    return this.http.get('/api/posts/all/' + this.pageLimit).pipe(
      timeout(3000),
      retry(4)
    );
  }

  triggered(email: string, registerItem: string, name: string) {
    localStorage.setItem('emailtemp', email);
    localStorage.setItem('navigateUser', email);
    if (registerItem === 'instructor') {
      this.data.passEmail(email);
      this.router.navigate(['/viewprofile/instructor/' + name]);
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

  instructorsDetails(response) {
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


  nextPage() {
    this.moreNextPosts = false;
    this.morePreviousPosts = false;
    if (this.pageCount >= 0) {
      this.pageCount += this.pageLimit;
      console.log('next clicked, page count', this.pageCount);
      this.api();
    }
  }

 

  api() {
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.temp = response;
      if (this.temp.status === 404) {
        console.log('no more posts');
        this.openSnackBar(this.MESSAGE_NO_POSTS);
        this.morePreviousPosts = true;
      }
      else {
        this.response = response;
        this.moreNextPosts = true;
        this.morePreviousPosts = true;
      }
      // this.postsLength = Object.keys(this.response).length;
      // console.log('hi there this is for eng ' + this.postsLength);
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIData() {
    return this.http.get('/api/posts/more/' + this.pageCount + '/' + this.pageLimit).pipe(
      // timeout(3000),
      // retry(4)
    );
  }

  previousPage() {
    this.moreNextPosts = false;
    this.morePreviousPosts = false;
    if (this.pageCount > 0) {
      this.pageCount -= this.pageLimit;
      console.log('prv clicked, page count', this.pageCount);
      this.api();
    }
    else {
      this.morePreviousPosts = false;
      this.moreNextPosts = true;
      this.openSnackBar(this.MESSAGE_NO_POSTS);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

}
