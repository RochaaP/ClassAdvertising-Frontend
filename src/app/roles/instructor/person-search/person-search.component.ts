import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { ThrowStmt } from '@angular/compiler';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit {

  response: any;
  email: string;
  verifiedif: boolean;

  // screenHeight: number;
  // screenWidth: number;
  smallerScreens: boolean;

  instructorResponse: any;
  classResponse: any;
  searchedList = [];
  searchedClassList = [];
  searchedClassList2 = [];
  searchedList2 = [];

  emailList = [];
  emailList2 = [];

  nameSearchClicked: boolean;
  classSearchClicked: boolean;
  // searchInput: string;
  searchNameInput: string;
  showByName: boolean;
  secondNamePart = '';
  firstNamePart = '';

  searchCityInput: string;
  searchSubjectInput: string;
  searchDistrictInput: string;
  showByClass: boolean;


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
    this.nameSearchClicked = false;
    this.classSearchClicked = false;

    this.showByName = false;

    this.getAPIData().subscribe((response) => {
      this.instructorResponse = response;
      this.spinnerService.hide();
    }, ( error) => {
      console.log('error is ', error);
    });
    this.getClassDetails();

  }

  getAPIData() {
    return this.http.get('/api/userDetails/instructor/getAll');
  }

  getClassDetails() {
    this.getAPIClassData().subscribe((classResponse) => {
      this.classResponse = classResponse;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIClassData() {
    return this.http.get('/api/classes/instructor/all');
  }

  triggered(email: string) {
      // this.notTriggeredClick = false;
      this.email = email;
  }

  searchName() {
    this.spinnerService.show();
    this.searchedList.splice(0, this.searchedList.length);
    if (this.searchNameInput) {
      this.nameSearchClicked = true;
      if (this.searchNameInput.split(' ').length === 2) {
        this.secondNamePart = this.searchNameInput.split(' ')[1].toLowerCase();
        this.firstNamePart = this.searchNameInput.split(' ')[0].toLowerCase();
      }
      for (const index in this.instructorResponse) {
        if (this.secondNamePart !== '' &&
            this.instructorResponse[index].data.firstname.toLowerCase().includes(this.firstNamePart) &&
            this.instructorResponse[index].data.lastname.toLowerCase().includes(this.secondNamePart) ) {

              this.searchedList.push(this.instructorResponse[index]);

        } else if (this.instructorResponse[index].data.firstname.toLowerCase().includes(this.searchNameInput.trim().toLowerCase()) ||
                 this.instructorResponse[index].data.lastname.toLowerCase().includes(this.searchNameInput.trim().toLowerCase())) {

              this.searchedList.push(this.instructorResponse[index]);

        }
      }
    }
    this.spinnerService.hide();
    if (this.smallerScreens) {
      window.scrollTo({top: 600, behavior: 'smooth'});
    }

  }


searchAllTogether() {
  // tslint:disable-next-line: forin
  this.spinnerService.show();
  this.searchedClassList2.splice(0, this.searchedClassList2.length);
  this.emailList2.splice(0, this.emailList2.length);
  // tslint:disable-next-line: forin
  if (this.searchedList) {
    // tslint:disable-next-line: forin
    for (const index in this.searchedList) {
      for (const vall in this.classResponse) {
        if (this.searchedList[index].data.email === this.classResponse[vall].data.email) {
          const name = this.classResponse[index].data.content;
          for (const val in name) {

            if (Boolean(this.searchCityInput)) {

              if (name[val].city.toLowerCase() === this.searchCityInput.trim().toLowerCase() &&
                  name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                  name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
                    this.searchedClassList2.push(name[val]);
                    this.emailList2.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
                }
              }
              else if (name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
              this.searchedClassList2.push(name[val]);
              this.emailList2.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
            }
          }
        }
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
    this.searchAllTogether();
    this.searchedClassList.splice(0, this.searchedClassList.length);
    this.emailList.splice(0, this.emailList.length);

    if (Boolean(this.searchDistrictInput) && Boolean(this.searchSubjectInput)) {
      this.classSearchClicked = true;

      // tslint:disable-next-line: forin
      for (const index in this.classResponse) {
        const name = this.classResponse[index].data.content;
        for (const val in name) {
          if (Boolean(this.searchCityInput)) {

            if (name[val].city.toLowerCase() === this.searchCityInput.trim().toLowerCase() &&
                name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
                  this.searchedClassList.push(name[val]);
                  this.emailList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
              }
            }
            else if (name[val].district.toLowerCase() === this.searchDistrictInput.trim().toLowerCase() &&
                    name[val].subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase() ) {
                this.searchedClassList.push(name[val]);
                this.emailList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
          }
        }
      }
    }
    this.spinnerService.hide();
    if (this.smallerScreens) {
      window.scrollTo({top: 600, behavior: 'smooth'});
    }

  }


  searchNameClose() {
    this.searchedList.splice(0, this.searchedList.length);
    this.nameSearchClicked = false;
    this.searchNameInput = '';
    // (document.getElementById('nameRadioButton') as HTMLInputElement).checked = false;
    // this.showByName = false;
  }

  searchClassClose() {
    this.searchedList.splice(0, this.searchedList.length);
    this.emailList.splice(0, this.emailList.length);
    this.searchDistrictInput = '';
    this.searchSubjectInput = '';
    this.searchNameInput = '';
    this.classSearchClicked = false;
    // (document.getElementById('nameRadioButton') as HTMLInputElement).checked = false;
    // this.showByName = false;
  }
//   eventByName(event: MatRadioChange) {
//     if (event.value === 'Name') {
//       this.showByName = true;
//       this.showByClass = false;
//     } else {
//       this.showByName = false;
//     }
//   }

// eventByClass(event: MatRadioChange) {
//     if (event.value === 'Class') {
//       this.showByClass = true;
//       // this.showByName = false;
//     } else {
//       this.showByClass = false;
//     }
  // }

  profileView(email: string, name: string, lastName: string) {
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    this.router.navigate(['/profile/instructor/view/' + name + ' ' + lastName]);
  }

  profileView2(email: string, name: string) {
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    this.router.navigate(['/profile/instructor/view/' + name]);
  }

}
