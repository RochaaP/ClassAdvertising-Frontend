import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/service/share/data.service';
import { ThrowStmt } from '@angular/compiler';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit {

  response: any;
  email: string;
  verifiedif: boolean;


  personResponse: any;
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
  ) { }

  ngOnInit() {
    this.nameSearchClicked = false;
    this.classSearchClicked = false;

    this.showByName = false;

    this.getAPIData().subscribe((instituteResponse) => {
      console.log('response what response ', instituteResponse);
      this.personResponse = instituteResponse;
      // for (const index in this.response) {
      //   if (this.response[index].data.registerItem === 'person') {
      //     this.personResponse.push(this.response[index]);
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
    return this.http.get('/api/getAllUsers/person');
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
    return this.http.get('/api/getAllClasses/persons');
  }

  triggered(email: string) {
      // this.notTriggeredClick = false;
      this.email = email;
  }

  searchName() {
    this.searchedList.splice(0, this.searchedList.length);
    if (this.searchNameInput) {
      this.nameSearchClicked = true;
      if (this.searchNameInput.split(' ').length === 2) {
        this.secondNamePart = this.searchNameInput.split(' ')[1].toLowerCase();
        this.firstNamePart = this.searchNameInput.split(' ')[0].toLowerCase();
      }
      for (const index in this.personResponse) {
        if (this.secondNamePart !== '' &&
            this.personResponse[index].data.name.toLowerCase() === this.firstNamePart &&
            this.personResponse[index].data.lastName.toLowerCase() === this.secondNamePart ) {

              this.searchedList.push(this.personResponse[index]);

        } else if (this.personResponse[index].data.name.toLowerCase() === this.searchNameInput.toLowerCase() ||
                 this.personResponse[index].data.lastName.toLowerCase() === this.searchNameInput.toLowerCase()) {

              this.searchedList.push(this.personResponse[index]);

        }
      }
    }
  }


searchAllTogether() {
  // tslint:disable-next-line: forin
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

              if (name[val].city.toLowerCase() === this.searchCityInput.toLowerCase() &&
                  name[val].district.toLowerCase() === this.searchDistrictInput.toLowerCase() &&
                  name[val].subject.toLowerCase() === this.searchSubjectInput.toLowerCase() ) {
                    this.searchedClassList2.push(name[val]);
                    this.emailList2.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
                }
              }
              else if (name[val].district.toLowerCase() === this.searchDistrictInput.toLowerCase() &&
                name[val].subject.toLowerCase() === this.searchSubjectInput.toLowerCase() ) {
              this.searchedClassList2.push(name[val]);
              this.emailList2.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
            }
          }
        }
      }
    }
  }
}

  searchClass() {
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

            if (name[val].city.toLowerCase() === this.searchCityInput.toLowerCase() &&
                name[val].district.toLowerCase() === this.searchDistrictInput.toLowerCase() &&
                name[val].subject.toLowerCase() === this.searchSubjectInput.toLowerCase() ) {
                  this.searchedClassList.push(name[val]);
                  this.emailList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
              }
            }
            else if (name[val].district.toLowerCase() === this.searchDistrictInput.toLowerCase() &&
                    name[val].subject.toLowerCase() === this.searchSubjectInput.toLowerCase() ) {
                this.searchedClassList.push(name[val]);
                this.emailList.push({email: this.classResponse[index].data.email, name: this.classResponse[index].data.name});
          }
        }
      }
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
    this.router.navigate(['/viewprofile/person/' + name + ' ' + lastName]);
  }

  profileView2(email: string, name: string) {
    this.dataService.passEmail(email);
    this.router.navigate(['/viewprofile/person/' + name]);
  }

}
