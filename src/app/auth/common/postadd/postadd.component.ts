import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from './../../../service/share/data.service';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.scss']
})
export class PostaddComponent implements OnInit {

  descriptionInput: '';
  path: string;
  message: string;
  ob: any;
  isHovering: boolean;

  files: File[] = [];
  userDetails: any;
  downloadURL: any;
  id: string;
  registerItem: string;


  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private data: DataService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  ngOnInit() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userdetails' + this.userDetails);
    this.registerItem = JSON.parse(localStorage.getItem('registerItem'));
    console.log('registerItem Postadd ' + this.registerItem);
  }

  onDrop(files: FileList) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(0));
      this.data.currentMessage.subscribe(message => this.path = message);
    }
  }

  onSubmit() {
    let userValues = {};
    const id = this.afs.createId();
    this.id = id.toString();

    userValues = {
      id: this.id,
      registerItem: this.registerItem,
      email: this.userDetails.email,
      description: this.descriptionInput,
      path: this.downloadURL,
    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
    }, (error) => {
      console.log('error during post is ', error);
    });

    this.descriptionInput = '';
  }

postAPIData(userValues: object) {
  return this.http.post('api/uploadposts', userValues);
}


  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `posts/${Date.now()}_${randomId}`;
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
      console.log('downloadurl ' + this.downloadURL);

      });
    });

  }

}
