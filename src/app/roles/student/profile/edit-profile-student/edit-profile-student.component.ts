import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { UserModel } from 'src/app/users/user-model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'src/app/subjects/subject.service';
import { UserService } from 'src/app/users/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { ImageCropperModalComponent } from 'src/app/util/image-cropper-modal/image-cropper-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-student',
  templateUrl: './edit-profile-student.component.html',
  styleUrls: ['./edit-profile-student.component.scss']
})
export class EditProfileStudentComponent implements OnInit {

  uploadBtnShow: boolean = true;

  fileProfile: AngularFireUploadTask;
  percentageProfile: Observable<number>;

  profileMetaData: any;
  uploadProfile: boolean;

  subjectGroup: {id: string, data: SubjectModel}[] = [];

  email: string;
  id: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  contactInput: string;
  temp_subjectList: string[];
  subjectList: string[];
  grade_level: string = "Other";
  img_url: any;

  response: any;

  MESSAGE_SUCCESS = 'DETAILS UPDATED';
  MESSAGE_FAIL = 'UPDATE FAILED';

  loggedInUser: {id: string, data: UserModel};

  constructor(
    private afStorage: AngularFireStorage,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: NgbModal,
    private subjectService: SubjectService,
    private userService: UserService,
    private sharedService: SharedService,
    private authService: AuthenticationService
    ) { 
      this.loggedInUser = this.sharedService.getLoggedInUser();
    }

  ngOnInit() {  
    this.subjectService.getSubjects(this);
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.emailInput = itemTemp.email;
      console.log('email ' + this.emailInput);
    }
    this.getAPIData().subscribe((response) => {
      response = response["userDetails"];
      console.log('response from GET is ', response[0]);

      this.id = response[0].id;
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
      this.profileMetaData = response[0].data.metadata;
      if (!this.img_url) {
        this.uploadProfile = false;
      } else {
        this.uploadProfile = true;
      }

    }, ( error) => {
      console.log('error is ', error);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
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
    return this.http.post('/api/userDetails/student/get', {email: this.emailInput} );
  }
  
  upload(event) {
    console.log(event);
    if (event.target.files[0] === undefined) {
      return;
    }
    this.uploadBtnShow = false;
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
      const ref = this.afStorage.ref(path);
      this.fileProfile = this.afStorage.upload(path, file);
      this.fileProfile.then(data => {
        this.profileMetaData = JSON.stringify(data.metadata);
        console.log(this.profileMetaData);

      });
      this.percentageProfile = this.fileProfile.percentageChanges();
      const task = this.afStorage.upload(path, file).then(() => {
        ref.getDownloadURL().subscribe(url => {
        this.img_url = url;
        this.uploadBtnShow = true;
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


  updateValues() {
    this.spinnerService.show();
    let userValues = {};
    userValues = {
        id: this.id,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput.trim(),
        units: this.subjectList,
        grade_level: this.grade_level,
        img_url: this.img_url,
        metadata: this.profileMetaData
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
    return this.http.post('api/userDetails/student/update', userValues);
  }

  deleteAccountPopUp(modal: any){
    this.modalService.open(modal);
  }

  deleteAccount(){
    this.spinnerService.show();  
    this.authService.deleteUser().then(()=>{            
      this.authService.logout();      
      this.userService.removeUser(this.loggedInUser.id).subscribe(res=>{
        this.sharedService.logoutRequest();
        this.spinnerService.hide();
        this.router.navigateByUrl("/");
      });  
    },
    onRejected=>{
      console.log(onRejected);
      this.openSnackBar("Please re-login before continue");
      this.router.navigateByUrl("account/login");
    });
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
