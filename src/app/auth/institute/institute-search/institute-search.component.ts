import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-institute-search',
  templateUrl: './institute-search.component.html',
  styleUrls: ['./institute-search.component.scss']
})
export class InstituteSearchComponent implements OnInit {

  response: any;
  classResponse: any;

  smallerScreens: boolean;

  instituteResponse: any;
  searchedList = [];
  searchedClassList = [];
  emailClassList = [];

  // notTriggeredClick: boolean;
  showByName: boolean;
  showByClass: boolean;
  nameSearchClicked: boolean;
  classSearchClicked: boolean;

  searchNameInput: string;
  searchSubjectInput: string;
  searchDistrictInput: string;
  searchPersonInput: string;

  email: string;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    public router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService
    ) {
      this.getScreenSize();
     }

     @HostListener('window:resize', ['$event'])
     getScreenSize(event?) {
          //  this.screenHeight = window.innerHeight;
          //  this.screenWidth = window.innerWidth;

           if (window.innerWidth < 768) {
              this.smallerScreens = true;
           }
           else {
             this.smallerScreens = false;
           }
          //  console.log(this.screenHeight, this.screenWidth);
     }

  ngOnInit() {
    this.spinnerService.show();
    // this.notTriggeredClick = true;
    this.nameSearchClicked = false;
    this.showByName = false;
    this.classSearchClicked = false;

    this.getAPIData().subscribe((instituteResponse) => {
      console.log('response what response ', instituteResponse);
      this.instituteResponse = instituteResponse;
      this.spinnerService.hide();
      // for (const index in this.response) {
      //   if (this.response[index].data.registerItem === 'person') {
      //     // this.personResponse.push(this.response[index]);
      //   } else if (this.response[index].data.registerItem === 'institute') {
      //     this.instituteResponse.push(this.response[index]);
      //   }
      // }
    }, ( error) => {
      console.log('error is ', error);
    });
    this.getClassDetails();

  }

  getAPIData() {
    return this.http.get('/api/getAllUsers/institute');
  }

  getClassDetails() {
    this.getAPIClassData().subscribe((classResponse) => {
      console.log('response what response ', classResponse);
      this.classResponse = classResponse;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIClassData() {
    return this.http.get('/api/getAllClasses/institute');
  }

  // triggered(email: string, name: string) {
  //   // this.notTriggeredClick = false;
  //   // this.email = email;
  //   this.dataService.passEmail(email);
  //   this.router.navigate(['/viewprofile/institute/' + name]);
  // }

  // eventByName(event: MatRadioChange) {
  //   if (event.value === 'Name') {
  //     this.showByName = true;
  //     // this.showByClass = false;
  //   } else {
  //     // this.showByName = false;
  //   }
  // }

  // eventByClass(event: MatRadioChange) {
  //   if (event.value === 'Class') {
  //     this.showByClass = true;
  //     // this.showByClass = false;
  //   } else {
  //     // this.showByName = false;
  //   }
  // }

  searchName() {
    this.spinnerService.show();
    this.searchedList.splice(0, this.searchedList.length);
    if (this.searchNameInput) {
      this.nameSearchClicked = true;
      this.showByName = true;
      for (const index in this.instituteResponse) {
        if (this.instituteResponse[index].data.name.toLowerCase() === this.searchNameInput.trim().toLowerCase()) {
          this.searchedList.push(this.instituteResponse[index]);
        }
      }
    }
    this.spinnerService.hide();
    if (this.smallerScreens) {
      window.scrollTo({top: 600, behavior: 'smooth'});
    }
  }

  searchClass() {
    this.spinnerService.show();

    this.searchedClassList.splice(0, this.searchedClassList.length);
    this.emailClassList.splice(0, this.emailClassList.length);

    if ((this.searchSubjectInput) && (this.searchDistrictInput)) {
      this.classSearchClicked = true;
      this.showByClass = true;
    // tslint:disable-next-line: forin
      for (const index in this.classResponse) {
        const name = this.classResponse[index].data.content;
        for (const val in name) {
          // console.log("hit there");
          if (this.searchPersonInput) {

            if (name[val].primary.toLowerCase() === this.searchPersonInput.trim().toLowerCase() &&
                name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
                  this.searchedClassList.push(name[val]);
                  this.emailClassList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
              }
            } else if (name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                        name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
                  this.searchedClassList.push(name[val]);
                  this.emailClassList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
          }
        }
      }
    }
    // console.log(this.searchedClassList);
    this.spinnerService.hide();
    if (this.smallerScreens) {
      window.scrollTo({top: 600, behavior: 'smooth'});
    }

  }

  searchNameClose() {
    this.nameSearchClicked = false;
    this.searchNameInput = '';
    this.searchedList.splice(0, this.searchedList.length);
  }
  searchClassClose() {
    this.classSearchClicked = false;
    this.searchPersonInput = '';
    this.searchSubjectInput = '';
    this.searchDistrictInput = '';
    this.searchedClassList.splice(0, this.searchedClassList.length);
    this.emailClassList.splice(0, this.emailClassList.length);
  }

  profileView(email: string, name: string) {
    console.log("yes")
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    this.router.navigate(['/viewprofile/institute/' + name]);
  }
}
