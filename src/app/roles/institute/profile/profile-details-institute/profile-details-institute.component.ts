import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-details-institute',
  templateUrl: './profile-details-institute.component.html',
  styleUrls: ['./profile-details-institute.component.scss']
})
export class ProfileDetailsInstituteComponent implements OnInit {

    @Input() childMessage: string;
    response: any;
    panelOpenState = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is about here ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.post('/api/userDetails/institute/get', {email: this.childMessage});
  }
}
