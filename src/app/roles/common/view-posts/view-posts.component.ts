import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {

  @Input() childMessage: string;
  response: any;
  email: string;

  editingIndex: number;
  titleInput: string;
  descriptionInput: string;
  cityInput: string;
  districtInput: string;
  contactInput: string;
  // imagePath: string;

  activeUserCustomization: boolean;
  editDetails: boolean;
  uploadImage: boolean;
  // fileposts: AngularFireUploadTask;
  // percentageposts: Observable<number>;

  imagePathOnClick: string;


  MESSAGE_SUCCESS = 'POST UPDATED';
  MESSAGE_FAIL = 'POST UPDATE FAILED';


  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private afStorage: AngularFireStorage,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService

  ) { }

  ngOnInit() {
    // this.email = this.childMessage;
    this.activeUserCustomization = false;
    this.editDetails = false;

    this.getAPIData().subscribe((response) => {
      console.log('response from GET API viewpost on unique users ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

    if (this.authService.isUserLoggedIn().email === this.childMessage) {
      this.activeUserCustomization = true;
    }

  }

  getAPIData() {
    return this.http.post('/api/posts/get/individual', {email: this.childMessage});
  }

  delete(id: string, fileURL: string) {
    this.spinnerService.show();
    this.deleteAPIData(id).subscribe((response) => {
      // console.log('response from GET API viewpost on unique users ', response);
      this.response = response;
      if (this.response.status === 200) {
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.afStorage.storage.refFromURL(fileURL).delete();
        this.spinnerService.hide();
      }
      else if (this.response.status === 400) {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  deleteAPIData(id: string) {
    console.log(id);
    return this.http.post('/api/posts/deletePosts', {idValue: id});
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 4000,
    });
  }

  edit(index: number) {
    this.editingIndex = index;
    this.editDetails = true;
    // this.uploadImage = true;
    this.titleInput = this.response[index].data.title;
    this.descriptionInput = this.response[index].data.description;
    this.cityInput = this.response[index].data.city;
    this.districtInput = this.response[index].data.district;
    this.contactInput = this.response[index].data.contact;
    // this.imagePath = this.response[index].data.path;
  }

  viewEdit() {
    let element = document.getElementById('editPost');
    element.scrollIntoView({behavior: 'smooth'});
  }


  onSubmit() {
    this.spinnerService.show();
    let userValues = {};

    userValues = {
      id: this.response[this.editingIndex].id,
      // registerItem: this.response[this.editingIndex].data.registerItem,
      // email: this.response[this.editingIndex].data.email,
      title: this.titleInput,
      city: this.cityInput,
      district: this.districtInput,
      contact: this.contactInput,
      description: this.descriptionInput,
      // path: this.imagePath,
      // name: this.response[this.editingIndex].data.name,

    };

    this.postAPIData(userValues).subscribe((response) => {
      console.log('response from POST API is ', response);
      this.response = response;
      console.log(this.response.status);
      if (this.response.status === 200) {
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
        location.reload();
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

postAPIData(userValues: object) {
  return this.http.post('api/posts/update', userValues);
}

clear() {
  this.editDetails = false;
}

// image delete part

  // upload(event) {
  //   this.uploadImage = true;
  //   const randomId = Math.random().toString(36).substring(2);
  //   const path = `posts/${Date.now()}_${randomId}`;
  //   this.imagePathOnClick = path;
  //   // Reference to storage bucket
  //   const ref = this.afStorage.ref(path);
  //   // The main task
  //   this.fileposts = this.afStorage.upload(path, event.target.files[0]);
  //   this.percentageposts = this.fileposts.percentageChanges();    // this.task = this.afStorage.upload(path, event.target.files[0]);
  //   // console.log(this.task.downloadURL());
  //   // this.downloadURL = this.task.downloadURL();
  //   // console.log(this.downloadURL);
  //   const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
  //     // const ref = this.afStorage.ref(path);
  //     const downloadURL = ref.getDownloadURL().subscribe(url => {
  //     const Url = url; // for ts
  //     this.imagePath = url; // with this you can use it in the html
  //     console.log('downloadurl ' + this.imagePath);

  //     });
  //   });

  // }

  // deleteImage() {
  //   this.afStorage.storage.refFromURL(this.imagePath).delete();
  //   this.imagePath = '';
  //   this.uploadImage = false;
  // }

}
