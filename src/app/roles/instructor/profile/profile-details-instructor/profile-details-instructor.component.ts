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
    this.response = this.childMessage;
  }
}

