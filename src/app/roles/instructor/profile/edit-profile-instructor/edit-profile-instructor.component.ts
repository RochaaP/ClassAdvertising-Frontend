import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-edit-profile-instructor',
  templateUrl: './edit-profile-instructor.component.html',
  styleUrls: ['./edit-profile-instructor.component.scss']
})
export class EditProfileInstructorComponent implements OnInit {

  // @Input() childMessageEmail: string;

  fileProfile: AngularFireUploadTask;
  percentageProfile: Observable<number>;

  fileBackground: AngularFireUploadTask;
  percentageBackground: Observable<number>;

  fileStudent: AngularFireUploadTask;
  percentageStudent: Observable<number>;

  uploadProfilePath = '';
  uploadProfile: boolean;

  uploadBackgroundPath = '';
  uploadBackground: boolean;

  email: string;
  id: string;
  // titleInput: string;
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

  img_url: any;
  backgroundImageURL: any;

  details: any;
  ac: any;
  cards = [];
  tab = [];
  achievementslist = [];
  response: any;
  // show: boolean;
  // lists = [];

  tabs = [];
  selected = new FormControl(0);

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  MESSAGE_SUCCESS = 'DETAILS UPDATED';
  MESSAGE_FAIL = 'UPDATE FAILED';

  triggeredcrop: boolean;

  constructor(
     private afStorage: AngularFireStorage,
     private http: HttpClient,
     private afs: AngularFirestore,
     private snackBar: MatSnackBar,
     private spinnerService: Ng4LoadingSpinnerService
    ) { }

  ngOnInit() {

    this.triggeredcrop = false;
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.emailInput = itemTemp.email;
      console.log('asdkfjka email ' + this.emailInput);
    }
    this.getAPIData().subscribe((response) => {
      console.log('response from GET is ', response[0]);

      this.id = response[0].id;
      // this.titleInput = response[0].data.title;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;
      this.firstNameInput = response[0].data.firstname;
      this.lastNameInput = response[0].data.lastname;
      this.img_url =  response[0].data.img_url;

      if (!this.img_url) {
        this.uploadProfile = false;
      } else {
        this.uploadProfile = true;
      }

      this.backgroundImageURL = response[0].more.backgroundImagePath;
      if (!this.backgroundImageURL) {
        this.uploadBackground = false;
      } else {
         this.uploadBackground = true;
      }

      this.degreeInput = response[0].more.degree;
      this.universityInput = response[0].more.university;
      this.yearInput = response[0].more.degreeYear;
      this.gradInput = response[0].more.grad;
      this.teachingSchoolInput = response[0].more.teachingSchool;
      this.yearExperienceInput = response[0].more.yearExperiences;

      this.universityMScInput = response[0].more.universityMSc;
      this.degreeMScInput = response[0].more.degreeMSc;
      this.yearMScInput = response[0].more.yearMSc;

      this.universityPhDInput = response[0].more.universityPhD;
      this.degreePhDInput = response[0].more.degreePhd;
      this.yearPhDInput = response[0].more.yearPhD;

      this.subjectInput = response[0].more.subject;
      this.gradeAInput = response[0].more.gradeA;
      this.gradeBInput = response[0].more.gradeB;
      this.gradeCInput = response[0].more.gradeC;
      this.gradeSInput = response[0].more.gradeS;

      this.cards = response[0].more.achievement;
      this.achievementslist = response[0].more.personalAchievement;

    }, ( error) => {
      console.log('error is ', error);
    });
 }
  getAPIData() {
    return this.http.post('/api/userDetails/instructor/get', {email: this.emailInput} );
  }
  // event() {
  //   if (this.titleInput === 'Other') {
  //       this.show = true;
  //   }
  //   else {
  //     this.show = false;
  //   }
  // }

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
    this.uploadProfile = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `profilePictures/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    this.uploadProfilePath = path;
    // The main task
    this.fileProfile = this.afStorage.upload(path, event.target.files[0]);
    this.percentageProfile = this.fileProfile.percentageChanges();
    // console.log(this.task.img_url());
    // this.img_url = this.task.img_url();
    // console.log(this.img_url);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);

      ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.img_url = url; // with this you can use it in the html
      });
   });
  }

  deleteProfile() {
    if (this.uploadProfilePath) {
      this.afStorage.ref(this.uploadProfilePath).delete().subscribe(() => {
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('successfully deleted');
      });
    }
    this.uploadProfile = false;
    this.img_url = '';
  }

  backgroundUpload(event) {
    this.uploadBackground = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `backgroundImages/${Date.now()}_${randomId}`;
    this.uploadBackgroundPath = path;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    this.fileBackground = this.afStorage.upload(path, event.target.files[0]);
    this.percentageBackground = this.fileBackground.percentageChanges();
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const r = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.backgroundImageURL = url; // with this you can use it in the html
      });
    });
    console.log('img_url ' + this.backgroundImageURL);

  }

  deleteBackground() {
    if (this.uploadBackgroundPath) {
      this.afStorage.ref(this.uploadBackgroundPath).delete().subscribe(() => {

      }, () => {
        console.log('deleted Failed');
      }, () => {
        console.log('successfully deleted');
      });
    }

    this.uploadBackground = false;
    this.backgroundImageURL = '';
  }


  updateValues() {
    this.spinnerService.show();
    let userValues = {};
    userValues = {
        id: this.id,
        // title: this.titleInput,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput.trim(),
        degree: this.degreeInput,
        university: this.universityInput,
        degreeYear: this.yearInput,
        grad: this.gradInput,
        img_url: this.img_url,
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
        console.log('response from POST API is here', response);
        this.response = response;
        console.log(this.response.status);
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
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/userDetails/instructor/update', userValues);
  }

  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
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
    this.percentageStudent = null;
  }

  uploadImageStudent(event) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `profilePicturesofStudents/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    this.fileStudent = this.afStorage.upload(path, event.target.files[0]);
    this.percentageStudent = this.fileStudent.percentageChanges();
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const img_url = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.rankedProfileURLInput = url; // with this you can use it in the html
      });
    });
    console.log('img_url ' + this.img_url);

  }

  addPersonalAchievements() {
    this.achievementslist.push(this.personalAchievementInput);
    this.personalAchievementInput = '';
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

  deletePersonalAchievements(index: number) {
    this.achievementslist.splice(index, 1);
  }

  deleteResultAchievement(index: number) {
    this.cards.splice(index, 1);
  }

}

//   title = 'angular-image-uploader';

//   imageChangedEvent: any = '';
//   croppedImage: any = '';
//   imageBlob: any = '';

//   fileChangeEvent(event: any): void {
//       this.imageChangedEvent = event;
//   }
//   imageCropped(event: ImageCroppedEvent) {
//       this.croppedImage = event.base64;
//       this.imageBlob = this.dataURItoBlob(event.base64);
//     console.log(this.croppedImage)
//     }

//   imageLoaded() {
//       // show cropper
//   }
//   cropperReady() {
//       // cropper ready
//   }
//   loadImageFailed() {
//       // show message
//   }
//   dataURItoBlob(dataURI) {
//     const byteString = window.atob(dataURI);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([int8Array], { type: 'image/jpeg' });
//     return blob;
//  }
//   uploadImagecropped(event) {
//     const randomId = Math.random().toString(36).substring(2);
//     const path = `profilePicturesofStudents/${Date.now()}_${randomId}`;
//     // Reference to storage bucket
//     const ref = this.afStorage.ref(path);


//     this.fileStudent = this.afStorage.upload(path, this.imageBlob);
//     this.percentageStudent = this.fileStudent.percentageChanges();
//     // The main task
//     // this.task = this.afStorage.upload(path, event.target.files[0]);
//     // console.log(this.task.downloadURL());
//     // this.downloadURL = this.task.downloadURL();
//     // console.log(this.downloadURL);
//     const task = this.afStorage.upload(path, this.imageBlob).then(() => {
//       // const ref = this.afStorage.ref(path);
//       const downloadURL = ref.getDownloadURL().subscribe(url => {
//       const Url = url; // for ts
//       this.rankedProfileURLInput = url; // with this you can use it in the html
//       });
//     });
//     console.log('downloadurl ' + this.downloadURL);

//   }
// }