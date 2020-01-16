import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-classes-institute',
  templateUrl: './classes-institute.component.html',
  styleUrls: ['./classes-institute.component.scss']
})
export class ClassesInstituteComponent implements OnInit {


  // tabs = [];
  // cards = [];
  // tempNew = [];


  classListAll = [];
  classListAllLength: number;
  classListNewlyAdded = [];

  editListAll: boolean;
  editListNew: boolean;
  editValNum: number;


  selected = new FormControl(0);
  selectedCard = new FormControl(0);

  panelOpenState = false;

  nameInput: string;
  id: string;

  primaryInput = '';
  classInput = '';
  timeInput = '';
  dayInput = '';
  mediumInput = '';
  classTypeInput = '';
  firstNameInput = '';
  ageInput = '';
  cityInput = '';
  DistrictInput = '';
  subjectInput = '';

  userDetails: any;
  detailss: any;
  details: any;
  registerItem: string;
  email: string;
  response: any = [];
  recievedContent: any;

  MESSAGE_SUCCESS = 'DETAILS UPDATED';
  MESSAGE_FAIL = 'UPDATE FAILED';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.nameInput = '';
    this.userDetails = this.authService.isUserLoggedIn();
    this.registerItem = JSON.parse(localStorage.getItem('registerItem'));
    if (this.userDetails != null) {
      this.email = this.userDetails.email;
      this.getExistingValues();
    }
  }

  // addTab(selectAfterAdding: boolean) {
  //   this.tabs.push(this.nameInput);
  //   this.nameInput = '';

  //   if (selectAfterAdding) {
  //     // this.selected.setValue(this.tabs.length - 1);
  //   }
  // }

  // removeTab(index: number) {
  //   delete this.tabs[index];
  // }
  // removeDe(index: number) {
  //   // delete this.cards[index];
  //   // this.cards.splice(index, 1);
  //   // delete this.cards[index];
  //   this.cards.forEach(o => {
  //     console.log('asjdkgh' + o.index);
  // });
  //   console.log(this.cards);
  // }

  submit() {
    this.details = {

      subject: this.subjectInput,
      primary: this.primaryInput,
      city: this.cityInput,
      district: this.DistrictInput,
      class: this.classInput,
      time: this.timeInput,
      day: this.dayInput,
      medium: this.mediumInput,
      classType:  this.classTypeInput

    };
    this.classListAll.push(this.details);
    this.classListNewlyAdded.push(this.details);
    // (document.getElementById('buttonUploadAll') as HTMLInputElement).disabled = false;

  }
  upload() {
    this.spinnerService.show();

    let values;
    values = {
      id: this.id,
      registerItem: this.registerItem,
      email: this.userDetails.email,
      content : this.classListAll
    };

    this.postAPIData(values).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
      if (this.response.status === 200) {
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
      }
      else if (this.response.status === 400) {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
    }, (error) => {
      console.log('error during post is ', error);
    });
    this.primaryInput = '';
    this.classInput = '';
    this.timeInput = '';
    this.dayInput = '';
    this.mediumInput = '';
    this.classTypeInput = '';
    this.cityInput = '';
    this.DistrictInput = '';
    this.subjectInput = '';

    // (document.getElementById('buttonUploadAll') as HTMLInputElement).disabled = true;
    // this.classListAll.splice(0, this.classListAll.length);
    this.classListNewlyAdded.splice(0, this.classListNewlyAdded.length);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  postAPIData(userValues: object) {
  return this.http.post('api/uploadClasses/institute', userValues);
  }

  getExistingValues() {
    this.getAPIData().subscribe((response) => {
      // this.response = response[0].data.content;
      if (response[0].id ==  null){
        const id = this.afs.createId();
        this.id = id;
        this.classListAllLength = 0;

      }
      else {
        this.id = response[0].id;
        this.classListAll = response[0].data.content;
        this.classListAllLength = this.classListAll.length;
      }
    }, (error) => {
      console.log('error during post is ', error);
    });
  }


  getAPIData() {
    return this.http.post('api/getClasses/institute', {email: this.email});
  }
  deleteFromNew(index: number) {
    this.classListNewlyAdded.splice(index, 1);
    this.classListAll.splice(index + this.classListAllLength, 1);
  }

  deleteFromAll(index: number) {
    this.classListAll.splice(index, 1);
    if (index > this.classListAllLength - 1) {
      this.classListNewlyAdded.splice(index - this.classListAllLength, 1);
    }
  }

  editFromAll(index: number) {
    this.editListAll = true;
    this.editValNum = index;
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.primaryInput = this.classListAll[index].primary;
    // this.placeInput = this.classListAll[index].place;
    this.classInput = this.classListAll[index].class;
    this.timeInput = this.classListAll[index].time;
    this.dayInput = this.classListAll[index].day;
    this.mediumInput = this.classListAll[index].medium;
    this.classTypeInput = this.classListAll[index].classType;
    this.cityInput = this.classListAll[index].city;
    this.DistrictInput = this.classListAll[index].district;
    this.subjectInput = this.classListAll[index].subject;
  }

  updateEditedFromAll() {
    this.editListAll = false;
    this.classListAll[this.editValNum].primary = this.primaryInput;
    // this.classListAll[this.editValNum].place = this.placeInput;
    this.classListAll[this.editValNum].class = this.classInput;
    this.classListAll[this.editValNum].time = this.timeInput;
    this.classListAll[this.editValNum].day = this.dayInput;
    this.classListAll[this.editValNum].medium = this.mediumInput;
    this.classListAll[this.editValNum].classType = this.classTypeInput;
    this.classListAll[this.editValNum].city = this.cityInput;
    this.classListAll[this.editValNum].district = this.DistrictInput;
    this.classListAll[this.editValNum].subject = this.subjectInput;

    if (this.editValNum > this.classListAllLength - 1) {

      const val = this.editValNum - this.classListAllLength;
      this.classListNewlyAdded[val].primary = this.primaryInput;
      // this.classListNewlyAdded[val].place = this.placeInput;
      this.classListNewlyAdded[val].class = this.classInput;
      this.classListNewlyAdded[val].time = this.timeInput;
      this.classListNewlyAdded[val].day = this.dayInput;
      this.classListNewlyAdded[val].medium = this.mediumInput;
      this.classListNewlyAdded[val].classType = this.classTypeInput;
      this.classListNewlyAdded[val].city = this.cityInput;
      this.classListNewlyAdded[val].district = this.DistrictInput;
      this.classListNewlyAdded[val].subject = this.subjectInput;
    }
  }

  editFromNew(index: number) {
    this.editListNew = true;
    this.editValNum = index;
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.primaryInput = this.classListNewlyAdded[index].primary;
    // this.placeInput = this.classListNewlyAdded[index].place;
    this.classInput = this.classListNewlyAdded[index].class;
    this.timeInput = this.classListNewlyAdded[index].time;
    this.dayInput = this.classListNewlyAdded[index].day;
    this.mediumInput = this.classListNewlyAdded[index].medium;
    this.classTypeInput = this.classListNewlyAdded[index].classType;
    this.cityInput = this.classListNewlyAdded[index].city;
    this.DistrictInput = this.classListNewlyAdded[index].district;
    this.subjectInput = this.classListNewlyAdded[index].subject;
  }


  updateEditedFromNew() {
    this.editListNew = false;
    const val = this.editValNum + this.classListAllLength;

    this.classListAll[val].primary = this.primaryInput;
    // this.classListAll[val].place = this.placeInput;
    this.classListAll[val].class = this.classInput;
    this.classListAll[val].time = this.timeInput;
    this.classListAll[val].day = this.dayInput;
    this.classListAll[val].medium = this.mediumInput;
    this.classListAll[val].classType = this.classTypeInput;
    this.classListAll[val].city = this.cityInput;
    this.classListAll[val].district = this.DistrictInput;
    this.classListAll[val].subject = this.subjectInput;



    this.classListNewlyAdded[this.editValNum].primary = this.primaryInput;
    // this.classListNewlyAdded[this.editValNum].place = this.placeInput;
    this.classListNewlyAdded[this.editValNum].class = this.classInput;
    this.classListNewlyAdded[this.editValNum].time = this.timeInput;
    this.classListNewlyAdded[this.editValNum].day = this.dayInput;
    this.classListNewlyAdded[this.editValNum].medium = this.mediumInput;
    this.classListNewlyAdded[this.editValNum].classType = this.classTypeInput;
    this.classListNewlyAdded[this.editValNum].city = this.cityInput;
    this.classListNewlyAdded[this.editValNum].district = this.DistrictInput;
    this.classListNewlyAdded[this.editValNum].subject = this.subjectInput;
  }


  updateAPIData() {
    return this.http.post('api/getClasses/person', {email: this.email});
  }

  clear() {
    this.primaryInput = '';
    this.classInput = '';
    this.timeInput = '';
    this.dayInput = '';
    this.mediumInput = '';
    this.classTypeInput = '';
    this.cityInput = '';
    this.DistrictInput = '';
    this.subjectInput = '';
  }
}
