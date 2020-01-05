import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classes-view-institute',
  templateUrl: './classes-view-institute.component.html',
  styleUrls: ['./classes-view-institute.component.scss']
})
export class ClassesViewInstituteComponent implements OnInit {

  @Input() childMessage: string;

  response: any;
  email: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.email = this.childMessage;
    if (this.email != null) {
      this.getExistingValues();
      console.log("this is fro classes case "+this.email);
    }
  }

  getExistingValues() {
    this.getAPIData().subscribe((response) => {
      // this.response = response[0].data.content;
      this.response = response;
      console.log(this.response);
      console.log('response from POST API is in classes tab ', response);
    }, (error) => {
      console.log('error during post is ', error);
    });
  }


  getAPIData() {
    return this.http.post('api/getClasses/institute', {email: this.email});
  }

}
