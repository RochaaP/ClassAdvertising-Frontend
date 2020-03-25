import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser, faSchool, faSignOutAlt, faIdBadge, faStickyNote, faDownload,
         faChalkboardTeacher, faAd, faIdCard, faUserFriends, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../service/auth/authentication.service';
import { DataService } from '../service/share/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  searchClicked: boolean;

  searchInput: string;
  userLogged: boolean;
  registerItem: string;

  isStudent: boolean;
  isInstructor: boolean;

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService,
    private router: Router
  ) {
        // dataService.getLoggedInName.subscribe(name => this.changeName(name));
  }

  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  faSchool = faSchool;
  faChalkboardTeacher = faChalkboardTeacher;
  faAd = faAd;
  faIdCard = faIdCard;
  faUserFriends = faUserFriends;
  faSignOutAlt = faSignOutAlt;
  faIdBadge = faIdBadge;
  faBookReader = faBookReader;
  faStickyNote = faStickyNote;
  faDownload = faDownload;

  item: string[];

  userDetails: any;
  userName: string;

//   private changeName(name: string): void {
//     // this.userName = name;
//     console.log('this.userName '+ this.userName);
// }
  ngOnInit() {
    this.isUserLoggedIn();
    this.searchClicked = false;

  }

  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
    if (this.userDetails) {
      this.userLogged = true;
      this.userName = this.authService.getEmitterUserName();
      this.registerItem = this.authService.getRegisterItem();
      if (this.registerItem === 'student') {
        this.isStudent = true;
        this.isInstructor = false;
      }
      else if (this.registerItem === 'person') {
        this.isStudent = false;
        this.isInstructor = true;
      }
      else {
        this.isStudent = false;
        this.isInstructor = false;
      }
      // location.reload();
   } else {
      this.userLogged = false;
   }
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        this.userLogged = false;
        localStorage.removeItem('user');
        localStorage.removeItem('registerItem');
        localStorage.removeItem('resgisterUserName');
        this.router.navigate(['/']);
      });
  }

  clickViewProfile() {
    localStorage.setItem('emailtemp', this.userDetails.email);
    if (this.registerItem === 'person') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['viewprofile/person/' + this.userName]);
    }
    else if (this.registerItem === 'institute') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['viewprofile/institute/' + this.userName]);
    }
    else if (this.registerItem === 'student') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['viewprofile/student/' + this.userName]);
    }
  }

  clickPostAd() {
    this.router.navigate(['/postadd']);
  }

  clickProfile() {
    if (this.registerItem === 'person'){
      this.router.navigate(['/editprofile/person']);
    }
    else if (this.registerItem === 'institute'){
      this.router.navigate(['/editprofile/institute']);
    }
    else if (this.registerItem === 'student'){
      this.router.navigate(['/editprofile/student']);
    }
  }

  clickClasses() {
    if (this.registerItem === 'person'){
      this.router.navigate(['/addclasses/person']);
    }
    else if (this.registerItem === 'institute'){
      this.router.navigate(['/addclasses/institute']);
    }
  }

  clickPapers() {
    this.router.navigate(['/papers']);
  }
}


