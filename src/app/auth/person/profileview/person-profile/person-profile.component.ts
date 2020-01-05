import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent implements OnInit {

  // @Input() childMessageEmail: string;

  email: string;
  id: string;
  titleInput: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  contactInput: string;
  universityInput: string;
  gradInput: string;
  profileImagePathInput: string;
  yearExperienceInput: string;
  degreeInput: '';
  yearInput: string;
  teachingSchoolInput: string;

  universityMScInput: string;
  degreeMScInput: string;
  yearMScInput: string;

  universityPhDInput: string;
  degreePhDInput: string;
  yearPhDInput: string;

  subjectInput: string;
  gradeAInput: string;
  gradeBInput: string;
  gradeCInput: string;
  gradeSInput: string;

  rankedNameInput: string;
  rankedYearInput: string;
  rankedIslandInput: string;
  rankedDistrictInput: string;
  rankedDistrictNameInput: string;
  rankedProfileURLInput: string;

  personalAchievementInput: string;

  showhideUniversity: boolean;
  showhideOccupation: boolean;
  showUnderGraduation: boolean;
  showPostGraduation: boolean;
  showhideMSc: boolean;
  showhidePhD: boolean;

  downloadURL: any;
  backgroundImageURL: any;

  details: any;
  ac: any;
  cards = [];
  tab = [];
  achievementslist = [];
  // lists = [];

  tabs = [];
  selected = new FormControl(0);

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  MESSAGE = 'DETAILS UPDATED';

  constructor(
     private afStorage: AngularFireStorage,
     private http: HttpClient,
     private afs: AngularFirestore,
     private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.emailInput = itemTemp.email;
      console.log('asdkfjka email ' + this.emailInput);
    }
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response[0]);

      this.id = response[0].id;
      this.titleInput = response[0].data.title;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;
      this.firstNameInput = response[0].data.firstName;
      this.lastNameInput = response[0].data.lastName;
      this.downloadURL =  response[0].data.profileImagePath;
      this.backgroundImageURL = response[0].data.backgroundImagePath;
      this.degreeInput = response[0].data.degree;
      this.universityInput = response[0].data.university;
      this.yearInput = response[0].data.degreeYear;
      this.gradInput = response[0].data.grad;
      this.teachingSchoolInput = response[0].data.teachingSchool;
      this.yearExperienceInput = response[0].data.yearExperiences;

      this.universityMScInput = response[0].data.universityMSc;
      this.degreeMScInput = response[0].data.degreeMSc;
      this.yearMScInput = response[0].data.yearMSc;

      this.universityPhDInput = response[0].data.universityPhD;
      this.degreePhDInput = response[0].data.degreePhd;
      this.yearPhDInput = response[0].data.yearPhD;

      this.subjectInput = response[0].data.subject;
      this.gradeAInput = response[0].data.gradeA;
      this.gradeBInput = response[0].data.gradeB;
      this.gradeCInput = response[0].data.gradeC;
      this.gradeSInput = response[0].data.gradeS;

      this.cards = response[0].data.achievement;
      this.achievementslist = response[0].data.personalAchievement;

    }, ( error) => {
      console.log('error is ', error);
    });
 }
  getAPIData() {
    return this.http.post('/api/getUserData/person', {email: this.emailInput} );
  }

  eventUniversity(event: { target: { checked: any; }; }) {
    if (event.target.checked) {
      this.showhideUniversity = true;
    } else {
      this.showhideUniversity = false;
    }
    this.gradInput = '';
  }
  eventOccupation(event) {
    if (event.target.checked) {
      this.showhideOccupation = true;
    } else {
      this.showhideOccupation = false;
    }
  }
  eventUnderGraduate(event) {
    if (event.target.checked) {
      this.showPostGraduation = false;
    } else {
      this.showUnderGraduation = false;
    }
  }
  eventPostGraduate(event) {
    if (event.target.checked) {
      this.showPostGraduation = true;
    } else {
      this.showPostGraduation = false;
    }
  }
  eventMScHolder(event) {
    if (event.target.checked) {
      this.showhideMSc = true;
    } else {
      this.showhideMSc = false;
    }
  }
  eventPhDHolder(event) {
    if (event.target.checked) {
      this.showhidePhD = true;
    } else {
      this.showhidePhD = false;
    }
  }


  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `profilePictures/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.downloadURL = url; // with this you can use it in the html
      });
    });
    console.log('downloadurl ' + this.downloadURL);

  }

  uploadBackground(event) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `backgroundImages/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.backgroundImageURL = url; // with this you can use it in the html
      });
    });
    console.log('downloadurl ' + this.downloadURL);

  }


  updateValues() {
    let userValues = {};

    userValues = {
        id: this.id,
        title: this.titleInput,
        email : this.emailInput,
        firstName: this.firstNameInput,
        lastName: this.lastNameInput,
        contact:  this.contactInput,
        degree: this.degreeInput,
        university: this.universityInput,
        degreeYear: this.yearInput,
        grad: this.gradInput,
        profileImagePath: this.downloadURL,
        backgroundImagePath: this.backgroundImageURL,
        yearExperiences: this.yearExperienceInput,
        teachingSchool: this.teachingSchoolInput,

        universityMSc: this.universityMScInput,
        degreeMSc: this.degreeMScInput,
        yearMSc: this.yearMScInput,

        universityPhD: this.universityPhDInput,
        degreePhD: this.degreePhDInput,
        yearPhD: this.yearPhDInput,

        subject: this.subjectInput,
        gradeA: this.gradeAInput,
        gradeB: this.gradeBInput,
        gradeC: this.gradeCInput,
        gradeS: this.gradeSInput,

        achievement: this.cards,
        personalAchievement: this.achievementslist

      };
    this.postAPIData(userValues).subscribe((response) => {
        console.log('response from POST API is ', response);
      }, (error) => {
        console.log('error during post is ', error);
      } , () => this.openSnackBar());
  }

  postAPIData(userValues: object) {
    return this.http.post('api/updateUserDetails/person', userValues);
  }

  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  openSnackBar() {
    this.snackBar.open(this.MESSAGE, 'Done', {
      duration: 2000,
    });
  }


  submit() {
    this.details = {
      rankedName: this.rankedNameInput,
      rankedYear: this.rankedYearInput,
      rankedIsland: this.rankedIslandInput,
      rankedDistrict: this.rankedDistrictInput,
      rankedDistrictName: this.rankedDistrictNameInput,
      rankedProfileURL:  this.rankedProfileURLInput
    };
    this.cards.push(this.details);

    this.rankedNameInput = '';
    this.rankedDistrictInput = '';
    this.rankedYearInput = '';
    this.rankedIslandInput = '';
    this.rankedDistrictNameInput = '';
    this.rankedProfileURLInput = '';
  }

  uploadImageStudent(event) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `profilePicturesofStudents/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.rankedProfileURLInput = url; // with this you can use it in the html
      });
    });
    console.log('downloadurl ' + this.downloadURL);

  }
addPersonalAchievements() {

    this.achievementslist.push(this.personalAchievementInput);
  }


  addTab() {
    const temp = this.tabs.length;
    this.tabs.push(temp);

    // if (selectAfterAdding) {
    //   this.selected.setValue(this.tabs.length - 1);
    // }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  deleteValues() {

  }
}
