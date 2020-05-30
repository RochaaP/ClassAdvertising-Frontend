import { Component, OnInit, Input, NgModuleRef, HostListener } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModalComponent } from 'src/app/util/image-cropper-modal/image-cropper-modal.component';
import { UploadFilesService } from 'src/app/service/Upload-files/upload-files.service';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { SubjectService } from 'src/app/subjects/subject.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { UserService } from 'src/app/users/user.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

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

  profileMetaData: any;
  uploadProfile: boolean;

  backgroundMetaData: any;
  uploadBackground: boolean;

  subjectGroup: {id: string, data: SubjectModel}[] = [];

  email: string;
  id: string;
  // titleInput: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  contactInput: string;
  temp_subjectList: string[];
  subjectList: string[];
  grade_level: string = "Other";
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
  rankedProfileMetaData: string;

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

  loggedInUser: {id: string, data: UserModel};

  constructor(
    private afStorage: AngularFireStorage,
    private http: HttpClient,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: NgbModal,
    private uploadFilesService: UploadFilesService,
    private subjectService: SubjectService,
    private userService: UserService,
    private sharedService: SharedService,
    private authService: AuthenticationService
    ) { 
      this.loggedInUser = this.sharedService.getLoggedInUser();
    }

  ngOnInit() {
    this.triggeredcrop = false;    
    this.subjectService.getSubjects(this);
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.emailInput = itemTemp.email;
      console.log('email ' + this.emailInput);
    }
    this.getAPIData().subscribe((response) => {
      console.log('response from GET is ', response[0]);

      this.id = response[0].id;
      // this.titleInput = response[0].data.title;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;      
      if(response[0].data.units!=undefined){
        this.subjectList = response[0].data.units;
      }
      if(response[0].data.grade_level!=undefined){
        this.grade_level = response[0].data.grade_level;
      }
      this.firstNameInput = response[0].data.firstname;
      this.lastNameInput = response[0].data.lastname;
      this.img_url =  response[0].data.img_url;
      this.profileMetaData = response[0].data.metaData;
      if (!this.img_url) {
        this.uploadProfile = false;
      } else {
        this.uploadProfile = true;
      }

      this.backgroundImageURL = response[0].more.backgroundImagePath;
      this.backgroundMetaData = response[0].more.backgroundMetaData;
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

 subjectSelectionChange(){
  this.subjectList = this.temp_subjectList;
  console.log(this.temp_subjectList);
 }

 subjectOpenedChange(){
  this.temp_subjectList = this.subjectList;
  console.log(this.subjectList);
 }

  getAPIData() {
    return this.http.post('/api/userDetails/instructor/get', {email: this.emailInput} );
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
    console.log(event);
    if (event.target.files[0] === undefined) {
      return;
    }
    let file;
    const modalRef = this.modalService.open(ImageCropperModalComponent, {size: 'lg'});
    modalRef.componentInstance.imageChangedEvent = event;
    modalRef.componentInstance.ratio = 1;
    modalRef.componentInstance.image.subscribe(res => {
      file = res.imgFile;
      if (file === undefined){
        this.openSnackBar('Please crop the image');
      }
      console.log(file);
      this.uploadProfile = true;
      const randomId = Math.random().toString(36).substring(2);
      const path = `profilePictures/${Date.now()}_${randomId}`;
      // Reference to storage bucket
      const ref = this.afStorage.ref(path);
      // The main task
      // this.fileProfile = this.afStorage.upload(path, event.target.files[0]);
      this.fileProfile = this.afStorage.upload(path, file);
      this.fileProfile.then(data => {
        this.profileMetaData = JSON.stringify(data.metadata);
        console.log(this.profileMetaData);

      });
      this.percentageProfile = this.fileProfile.percentageChanges();
      // console.log(this.task.img_url());
      // this.img_url = this.task.img_url();
      // console.log(this.img_url);
      // const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      const task = this.afStorage.upload(path, file).then(() => {
        // const ref = this.afStorage.ref(path);

        ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.img_url = url; // with this you can use it in the html
        });
      });
    });

  }

  deleteProfile() {
    console.log(this.profileMetaData);
    if (this.profileMetaData) {
      console.log('edit profile inst / delete profile / ' + this.profileMetaData );
      this.afStorage.ref(JSON.parse(this.profileMetaData).fullPath).delete().subscribe(() => {
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('successfully deleted');
        this.profileMetaData = '';
        this.img_url = '';
      });
    }
    this.uploadProfile = false;
    this.img_url = '';
  }

  backgroundUpload(event) {
    this.uploadBackground = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `backgroundImages/${Date.now()}_${randomId}`;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    this.fileBackground = this.afStorage.upload(path, event.target.files[0]);
    this.fileBackground.then(data => {
      this.backgroundMetaData = JSON.stringify(data.metadata);
    });
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
    if (this.backgroundMetaData) {
      this.afStorage.ref(JSON.parse(this.backgroundMetaData).fullPath).delete().subscribe(() => {

      }, (error) => {
        console.log('deleted Failed');
      }, () => {
        console.log('successfully deleted');
        this.backgroundMetaData = '';
        this.backgroundImageURL = '';
      });
    }

    this.uploadBackground = false;
    this.backgroundImageURL = '';
  }


  updateValues() {
    console.log(this.backgroundMetaData)
    this.spinnerService.show();
    let userValues = {};
    userValues = {
        id: this.id,
        // title: this.titleInput,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput.trim(),
        units: this.subjectList,
        grade_level: this.grade_level,
        degree: this.degreeInput,
        university: this.universityInput,
        degreeYear: this.yearInput,
        grad: this.gradInput,
        img_url: this.img_url,
        metaData: this.profileMetaData,
        backgroundImagePath: this.backgroundImageURL,
        backgroundMetaData: this.backgroundMetaData,
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
          this.userService.getUserByEmail(this.loggedInUser.data.email).subscribe(res=>{
            let user: {id: string, data: UserModel} = JSON.parse(JSON.stringify(res));
            this.loggedInUser = user;  
            this.sharedService.setLoggedInUser(user);
            this.authService.setUserName(user.data.firstname);
            this.authService.setRegisterItem(user.data.role);
            this.sharedService.navigationRequest();          
            this.spinnerService.hide();
          }
          ,err=>{
            console.log(err);
            this.openSnackBar(this.MESSAGE_FAIL);
            this.spinnerService.hide();
          });
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
      rankedProfileURL:  this.rankedProfileURLInput,
      rankedProfileMetaData: this.rankedProfileMetaData
    };
    this.cards.push(this.details);

    this.rankedNameInput = '';
    this.rankedDistrictInput = '';
    this.rankedYearInput = '';
    this.rankedIslandInput = '';
    this.rankedDistrictNameInput = '';
    this.rankedProfileURLInput = '';
    this.rankedProfileMetaData = '';
    this.percentageStudent = null;
  }


  uploadImageStudent(event) {
    // this.uploadFile = true;
    const tableName = 'profilePicturesofStudents';
    this.uploadFilesService.upload(event, tableName);
    this.percentageStudent = this.uploadFilesService.getPercentage(); // observe percentage
    this.uploadFilesService.getDownloadURL().subscribe(url => {
        this.rankedProfileURLInput = url.downloadURL;
    });
    this.uploadFilesService.getMetadata().subscribe(meta => {
      this.rankedProfileMetaData = meta.metadata;
    });
  }

  deleteFile(metaData: any) {
    console.log(JSON.parse(metaData).fullPath);
    this.spinnerService.show();
    const state = this.uploadFilesService.delete(JSON.parse(metaData).fullPath);
    console.log(state);
    this.spinnerService.hide();
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
    this.deleteFile(this.cards[index].rankedProfileMetaData);
    this.cards.splice(index, 1);
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      console.log(data.payload);
      let subjects: {id: string, data: SubjectModel}[] = data.payload;
      if(subjects!=undefined){
        subjects.forEach(subject=>{
          this.subjectGroup.push(subject);
        });
      }
      this.spinnerService.hide();
    }
  }
  
  onFail(serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      this.spinnerService.hide();
    }
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
