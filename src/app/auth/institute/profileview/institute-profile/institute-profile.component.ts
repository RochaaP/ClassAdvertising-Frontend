import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {


  // @Input() childMessageEmail: string;

  id: string;
  nameInput = '';
  emailInput = '';
  contactInput = '';
  street1Input = '';
  street2Input = '';
  cityInput = '';
  townInput = '';
  provinceInput = '';
  downloadURL = '';
  backgroundImageURL = '';


  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private http: HttpClient
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
      this.nameInput = response[0].data.name;
      this.emailInput = response[0].data.email;
      this.contactInput = response[0].data.contact;
      this.downloadURL =  response[0].data.profileImagePath;
      this.backgroundImageURL = response[0].data.backgroundImagePath;
      this.street1Input = response[0].data.streetNo1;
      this.street2Input = response[0].data.streetNo2;
      this.cityInput = response[0].data.city;
      this.townInput = response[0].data.town;
      this.provinceInput = response[0].data.province;
    }, ( error) => {
      console.log('error is ', error);
    });
  }

  getAPIData() {
    return this.http.post('/api/getUserData/institute', {email: this.emailInput} );
  }

  updateValues() {

    let userValues = {};

    userValues = {
        id: this.id,
        email : this.emailInput,
        name: this.nameInput,
        contact:  this.contactInput,
        streetNo1: this.street1Input,
        streetNo2: this.street2Input,
        city: this.cityInput,
        town: this.townInput,
        province: this.provinceInput,
        profileImagePath: this.downloadURL,
        backgroundImagePath: this.backgroundImageURL
      };
    this.postAPIData(userValues).subscribe((response) => {
        console.log('response from POST API is ', response);
      }, (error) => {
        console.log('error during post is ', error);
      });
  }

  postAPIData(userValues: object) {
    return this.http.post('api/updateUserDetails/institute', userValues);
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
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.downloadURL = url; // with this you can use it in the html
      });

    });
  }
  backgroundUpload(event) {
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
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.backgroundImageURL = url; // with this you can use it in the html
      });

    });
  }
}
