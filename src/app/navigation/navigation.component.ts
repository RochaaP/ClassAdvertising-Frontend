import { Component, OnInit } from '@angular/core';
import { faSearch, faBell, faUser, faSchool, faSignOutAlt, faIdBadge, faStickyNote, faDownload, faEnvelope,
         faChalkboardTeacher, faAd, faIdCard, faUserFriends, faBookReader, faCopy, faVideo, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../service/auth/authentication.service';
import { DataService } from '../service/share/data.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

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
    private router: Router,
    private sharedService: SharedService
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
  faEnvelope = faEnvelope;
  faCopy = faCopy;
  faVideo = faVideo;
  faQuestionCircle = faQuestionCircle;
  faInfoCircle = faInfoCircle;

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
    this.sharedService.navigationRespond().subscribe(() => {
      this.userDetails = this.authService.isUserLoggedIn();
      console.log('navigation / isuserLoggedIn / this.userDetails inside shared service');
      this.achieveData();
    });

  }

  isUserLoggedIn() {

    this.userDetails = this.authService.isUserLoggedIn();
    if (this.userDetails) {
      this.achieveData();
      console.log('navigation / isuserLoggedIn / this.userDetails = true');
    }
    // else {
    //   this.sharedService.navigationRespond().subscribe(() => {
    //     this.userDetails = this.authService.isUserLoggedIn();
    //     console.log('navigation / isuserLoggedIn / this.userDetails inside shared service');
    //     this.achieveData();
    //   });
    // }

    // this.sharedService.navigationRespond().subscribe(() => {
    //     this.userDetails = this.authService.isUserLoggedIn();
    //     console.log("this.userdetails " +this.userDetails);
    //     if (this.userDetails) {
    //         this.userLogged = true;
    //         this.userName = this.authService.getEmitterUserName();
    //         this.registerItem = this.authService.getRegisterItem();

    //         if (this.registerItem === 'student') {
    //           this.isStudent = true;
    //           this.isInstructor = false;
    //         }
    //         else if (this.registerItem === 'instructor') {
    //           this.isStudent = false;
    //           this.isInstructor = true;
    //         }
    //         else {
    //           this.isStudent = false;
    //           this.isInstructor = false;
    //         }
    //     }
    //     else {
    //         this.userLogged = false;
    //     }
    //  });
  }
  achieveData() {
    this.userLogged = true;
    this.userName = this.authService.getEmitterUserName();
    this.registerItem = this.authService.getRegisterItem();

    if (this.registerItem === 'student') {
      this.isStudent = true;
      this.isInstructor = false;
    } else if (this.registerItem === 'instructor') {
      this.isStudent = false;
      this.isInstructor = true;
    } else {
      this.isStudent = false;
      this.isInstructor = false;
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
    if (this.registerItem === 'instructor') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['/profile/instructor/view/' + this.userName]);
    } else if (this.registerItem === 'institute') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['/profile/institute/view/' + this.userName]);
    } else if (this.registerItem === 'student') {
      this.dataService.passEmail(this.userDetails.email);
      localStorage.setItem('navigateUser', this.userDetails.email);
      this.router.navigate(['/profile/student/view/' + this.userName]);
    }
  }

  clickPostAd() {
    this.router.navigate(['/postadd']);
  }

  // clickProfile() {
  //   if (this.registerItem === 'instructor') {
  //     this.router.navigate(['/profile/instructor/edit']);
  //   } else if (this.registerItem === 'institute') {
  //     this.router.navigate(['/profile/institute/edit']);
  //   } else if (this.registerItem === 'student') {
  //     this.router.navigate(['/profile/student/edit']);
  //   }
  // }

  clickClasses() {
    if (this.registerItem === 'instructor') {
      this.router.navigate(['/profile/instructor/classes']);
    } else if (this.registerItem === 'institute') {
      this.router.navigate(['/profile/institute/classes']);
    }
  }

  clickPapers() {
    this.router.navigate(['/papers']);
  }
  clickNotes() {
    this.router.navigate(['/notes/add']);
  }

  clickMessages() {
    this.router.navigate(['/messages/student']);
  }

  clickMessagesinst() {
    this.router.navigate(['/messages/instructor']);
  }
}


