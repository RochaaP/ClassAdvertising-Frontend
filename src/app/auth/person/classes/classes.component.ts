import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

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
    return this.http.post('api/getClasses/person', {email: this.email});
  }

}
