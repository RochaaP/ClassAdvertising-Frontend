import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit() {
  	// this.getAPIData().subscribe((response) => {
  	// 	console.log('response from GET API is ', response);
  	// }, ( error) => {
  	// 	console.log('error is ', error);
  	// });

  //  this.postAPIData().subscribe((response) => {
  //     console.log('response from POST API is ', response);
  //   }, (error) => {
  //     console.log('error during post is ', error);
  //   });
  }
  // getAPIData() {
  // 	return this.http.get('/api/getData');
  // }

  // postAPIData() {
  // 	return this.http.post('api/postData', {firstName : 'Code', lastName : 'Handbook'});
  // }
}
