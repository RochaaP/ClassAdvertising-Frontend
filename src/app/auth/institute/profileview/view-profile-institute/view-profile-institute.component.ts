import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../service/share/data.service';

@Component({
  selector: 'app-view-profile-institute',
  templateUrl: './view-profile-institute.component.html',
  styleUrls: ['./view-profile-institute.component.scss']
})
export class ViewProfileInstituteComponent implements OnInit {

  email: string;
  response: any;


  constructor(
    private data: DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.data.currentEmail.subscribe(message => this.email = message);
    if (!this.email) {
      this.email = localStorage.getItem('navigateUser');
    }

    console.log('this is from insti profile ' + this.email);
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.post('/api/getUserData/institute', {email: this.email} );
  }


}
