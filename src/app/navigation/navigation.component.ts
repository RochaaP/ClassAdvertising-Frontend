import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../service/auth/authentication.service';
import { DataService } from '../service/share/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService
  ) {
        // dataService.getLoggedInName.subscribe(name => this.changeName(name));
  }

  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  item: string[];

  userDetails: any;
  userName: string;

//   private changeName(name: string): void {
//     // this.userName = name;
//     console.log('this.userName '+ this.userName);
// }
  ngOnInit() {
    console.log("Hi therer from navigation");
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userdetails from navigation ' + this.userDetails);

  }

}


