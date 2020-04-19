import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-details-instructor',
  templateUrl: './profile-details-instructor.component.html',
  styleUrls: ['./profile-details-instructor.component.scss']
})
export class ProfileDetailsInstructorComponent implements OnInit {

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
    return this.http.post('/api/userDetails/instructor/get', {email: this.childMessage} );
  }
}

