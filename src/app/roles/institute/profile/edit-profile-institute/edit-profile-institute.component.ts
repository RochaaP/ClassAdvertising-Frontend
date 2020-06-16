import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCropperModalComponent } from 'src/app/util/image-cropper-modal/image-cropper-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/users/user.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-edit-profile-institute',
  templateUrl: './edit-profile-institute.component.html',
  styleUrls: ['./edit-profile-institute.component.scss']
})
export class EditProfileInstituteComponent implements OnInit {

  uploadBtnShow: boolean = true;

  fileProfile: AngularFireUploadTask;
  percentageProfile: Observable<number>;

  fileBackground: AngularFireUploadTask;
  percentageBackground: Observable<number>;

  id: string;
  nameInput = '';
  emailInput = '';
  contactInput = '';
  street1Input = '';
  street2Input = '';
  cityInput = '';
  districtInput = '';
  provinceInput = '';
  downloadURL = '';
  backgroundImageURL = '';

  uploadProfile: boolean;
  uploadProfilePath = '';
  profileMetaData: any;

  uploadBackground: boolean;
  uploadBackgroundPath = '';
  backgroundMetaData: any;

  response: any;

  MESSAGE_SUCCESS = 'DETAILS UPDATED';
  MESSAGE_FAIL = 'UPDATE FAILED';

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private sharedService: SharedService,
    private userService: UserService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal

    ) { }

  ngOnInit() {
    // this.uploadProfile = false;
    // this.uploadBackground = false;
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.emailInput = itemTemp.email;
      console.log('asdkfjka email ' + this.emailInput);
    }
    this.getAPIData().subscribe((response) => {
      console.log('response from get all details individual ', response[0]);

      this.id = response[0].id;
      this.nameInput = response[0].data.firstname;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;
      this.downloadURL =  response[0].data.img_url;
      this.profileMetaData = response[0].data.metadata;
      if (!this.downloadURL) {
        this.uploadProfile = false;
      }
      else {
        this.uploadProfile = true;
      }
      this.backgroundImageURL = response[0].more.backgroundImagePath;
      this.backgroundMetaData = response[0].more.backgroundMetaData;
      if (!this.backgroundImageURL) {
        this.uploadBackground = false;
      }
      else {
        this.uploadBackground = true;
      }
      this.street1Input = response[0].more.streetNo1;
      this.street2Input = response[0].more.streetNo2;
      this.cityInput = response[0].more.city;
      this.districtInput = response[0].more.district;
      this.provinceInput = response[0].more.province;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIData() {
    return this.http.post('/api/userDetails/institute/get', {email: this.emailInput} );
  }

  updateValues() {
    this.spinnerService.show();
    let userValues = {};

    userValues = {
        id: this.id,
        email : this.emailInput,
        firstname: this.nameInput,
        contact:  this.contactInput,
        streetNo1: this.street1Input,
        streetNo2: this.street2Input,
        city: this.cityInput,
        district: this.districtInput,
        province: this.provinceInput,
        img_url: this.downloadURL,
        metadata: this.profileMetaData,
        backgroundImagePath: this.backgroundImageURL,
        backgroundMetaData: this.backgroundMetaData
      };
    this.postAPIData(userValues).subscribe((response) => {
        console.log('response from POST API is ', response);
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
    return this.http.post('api/userDetails/institute/update', userValues);
  }

  upload(event) {
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
      if (file === undefined) {
        this.openSnackBar('Please crop the image');
      }
      this.uploadProfile = true;

      const randomId = Math.random().toString(36).substring(2);
      const path = `profilePictures/${Date.now()}_${randomId}`;
      this.uploadProfilePath = path;
    // Reference to storage bucket
      const ref = this.afStorage.ref(path);
      this.fileProfile = this.afStorage.upload(path, event.target.files[0]);
      this.fileProfile.then(data => {
        this.profileMetaData = JSON.stringify(data.metadata);
      });
      this.percentageProfile = this.fileProfile.percentageChanges();
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
      const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url; // for ts
          this.downloadURL = url; // with this you can use it in the html
          this.uploadBtnShow = true;
        });
      });
    });
  }

  deleteProfile() {

    if (this.profileMetaData) {
      this.afStorage.ref(JSON.parse(this.profileMetaData).fullPath).delete().subscribe(() => {
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('successfully deleted');
        this.profileMetaData = '';
        this.downloadURL = '';
      });
    }
    this.uploadProfile = false;
    this.downloadURL = '';
  }

  backgroundUpload(event) {
    this.uploadBackground = true;
    this.uploadBtnShow = false;

    const randomId = Math.random().toString(36).substring(2);
    const path = `backgroundImages/${Date.now()}_${randomId}`;
    this.uploadBackgroundPath = path;
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
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.backgroundImageURL = url; // with this you can use it in the html
      this.uploadBtnShow = true;
      });

    });
  }

  deleteBackground() {
    if (this.backgroundMetaData) {
      this.afStorage.ref(JSON.parse(this.backgroundMetaData).fullPath).delete().subscribe(() => {
      }, () => {
        console.log('deleted Failed');
      }, () => {
        console.log('successfully deleted');
        this.backgroundImageURL = '';
        this.backgroundMetaData = '';
      });
    }

    this.uploadBackground = false;
    this.backgroundImageURL = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  deleteAccountPopUp(modal: any){
    this.modalService.open(modal);
  }

  deleteAccount(){
    this.spinnerService.show();    
    this.userService.removeUser(this.id).subscribe(res=>{
      this.authService.deleteUser();
      this.authService.logout();
      this.sharedService.clearZoomAccessToken();
      localStorage.removeItem('user');
      localStorage.removeItem('registerItem');
      localStorage.removeItem('registerUserName');
      this.spinnerService.hide();
      this.router.navigateByUrl("/");
    });  
  }
}
