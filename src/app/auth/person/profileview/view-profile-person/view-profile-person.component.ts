import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../service/share/data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-profile-person',
  templateUrl: './view-profile-person.component.html',
  styleUrls: ['./view-profile-person.component.scss']
})
export class ViewProfilePersonComponent implements OnInit {

  email: string;
  response: any;


  constructor(
    private data: DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.data.currentEmail.subscribe(message => this.email = message);

    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.post('/api/getUserData/person', {email: this.email} );
  }


}
