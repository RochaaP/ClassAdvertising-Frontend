import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../../../service/share/data.service';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.scss']
})
export class PostaddComponent implements OnInit {

  fileposts: AngularFireUploadTask;
  percentageposts: Observable<number>;

  titleInput: string;
  descriptionInput: string;
  cityInput: string;
  districtInput: string;
  contactInput: string;

  path: string;
  imagePathOnClick: string;
  message: string;
  ob: any;
  isHovering: boolean;
  uploadImage: boolean;

  files: File[] = [];
  userDetails: any;
  downloadURL: any;
  id: string;
  registerItem: string;
  response: any;


  MESSAGE_SUCCESS = 'POST UPDATED';
  MESSAGE_FAIL = 'POST FAILED';

  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private data: DataService,
    private authService: AuthenticationService,
    private http: HttpClient,
    public router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  ngOnInit() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userdetails' + this.userDetails);
    this.registerItem = JSON.parse(localStorage.getItem('registerItem'));
    console.log('registerItem Postadd ' + this.registerItem);
    this.uploadImage = false;
  }

  onDrop(files: FileList) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(0));
      this.data.currentMessage.subscribe(message => this.path = message);
    }
  }

  onSubmit() {
    this.spinnerService.show();

    let userValues = {};
    const id = this.afs.createId();
    this.id = id.toString();

    userValues = {
      id: this.id,
      registerItem: this.registerItem,
      email: this.userDetails.email,
      title: this.titleInput,
      city: this.cityInput,
      district: this.districtInput,
      contact: this.contactInput,
      description: this.descriptionInput,
      path: this.downloadURL,
    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
      console.log(this.response.status);
      if (this.response.status === 200) {
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
        this.navi();
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

    // this.descriptionInput = '';
    // this.router.navigate(['/']);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  navi() {
    localStorage.setItem('needToReloadPage', 'true');
    this.router.navigate(['/']);
  }

  postAPIData(userValues: object) {
    return this.http.post('api/posts/add', userValues);
  }

  deleteImage() {
    this.afStorage.ref(this.imagePathOnClick).delete();
    this.downloadURL = '';
    this.uploadImage = false;
  }

  upload(event) {
    this.uploadImage = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `posts/${Date.now()}_${randomId}`;
    this.imagePathOnClick = path;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    // The main task
    this.fileposts = this.afStorage.upload(path, event.target.files[0]);
    this.percentageposts = this.fileposts.percentageChanges();    // this.task = this.afStorage.upload(path, event.target.files[0]);

  }

}
