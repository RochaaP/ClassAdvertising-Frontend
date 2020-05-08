import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { 
      const navEndEvents = router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      );
      navEndEvents.subscribe((event: NavigationEnd)=>{
        gtag('config', 'UA-155158514-1', {
          'page_path': event.urlAfterRedirects
        });
      });
    }

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
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)

}
}
