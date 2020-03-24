import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {


  // @Input() childMessageEmail: string;


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

  uploadBackground: boolean;
  uploadBackgroundPath = '';

  response: any;

  MESSAGE_SUCCESS = 'DETAILS UPDATED';
  MESSAGE_FAIL = 'UPDATE FAILED';

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar,

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
      console.log('response from GET API is ', response[0]);

      this.id = response[0].id;
      this.nameInput = response[0].data.firstname;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;
      this.downloadURL =  response[0].data.img_url;
      if (!this.downloadURL) {
        this.uploadProfile = false;
      }
      else {
        this.uploadProfile = true;
      }
      this.backgroundImageURL = response[0].more.backgroundImagePath;
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
    return this.http.post('/api/getUserData/institute', {email: this.emailInput} );
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
        backgroundImagePath: this.backgroundImageURL
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
    return this.http.post('api/updateUserDetails/institute', userValues);
  }

  upload(event) {
    this.uploadProfile = true;

    const randomId = Math.random().toString(36).substring(2);
    const path = `profilePictures/${Date.now()}_${randomId}`;
    this.uploadProfilePath = path;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    this.fileProfile = this.afStorage.upload(path, event.target.files[0]);
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
    this.downloadURL = '';
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
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.backgroundImageURL = url; // with this you can use it in the html
      });

    });
  }

  deleteBackground() {
    if (this.uploadBackgroundPath) {
      this.afStorage.ref(this.uploadBackgroundPath).delete().subscribe(() => {

      }, () => {
        console.log("deleted Failed");
      }, () => {
        console.log("successfully deleted");
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
}
