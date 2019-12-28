import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {

  @Input() childMessage: string;
  response: any;
  email: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.email = this.childMessage;
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API viewpost on unique users ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.post('/api/getUserPosts/user', {email: this.childMessage});
  }

}
