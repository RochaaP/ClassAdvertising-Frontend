import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-person-posts',
  templateUrl: './view-person-posts.component.html',
  styleUrls: ['./view-person-posts.component.scss']
})
export class ViewPersonPostsComponent implements OnInit {

  @Input() childMessage: string;

  response: any;
  panelOpenState = false;


  constructor(
    private http: HttpClient
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
    return this.http.post('/api/getUserData/person', {email: this.childMessage} );
  }



}

