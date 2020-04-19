import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Component({
  selector: 'app-images-change',
  templateUrl: './images-change.component.html',
  styleUrls: ['./images-change.component.scss']
})
export class ImagesChangeComponent implements OnInit {

  fileposts: AngularFireUploadTask;
  percentageposts: Observable<number>;
  
  path: string;
  imagePathOnClick: string;
  message: string;
  ob: any;
  isHovering: boolean;
  uploadImage: boolean;

  readyToUpload = [];

  files: File[] = [];
  userDetails: any;
  downloadURL: any;
  id: string;
  registerItem: string;
  response: any;

  // mySlideImages = ['../../../assets/background1.jpeg','../../../assets/background1.jpeg','../../../assets/background1.jpeg'];
  // myCarouselImages =  ['../../../assets/background1.jpeg','../../../assets/background1.jpeg','../../../assets/background1.jpeg'];
  
  // mySlideOptions={items: 1, dots: true, nav: true};
  // myCarouselOptions={items: 3, dots: true, nav: true};

  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

@ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(
    private afStorage: AngularFireStorage,
    public router: Router,
    private http: HttpClient,
  ) { }




  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.getAPIData().subscribe((response) => {
      console.log('response from images ', response);
      this.response = response;
      this.images = response[0].data.url[0];
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.get('api/admin/images/getImages');
  }

  upload(event) {
    this.uploadImage = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `admin/${Date.now()}_${randomId}`;
    this.imagePathOnClick = path;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    // The main task
    this.fileposts = this.afStorage.upload(path, event.target.files[0]);
    this.percentageposts = this.fileposts.percentageChanges();    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      // const ref = this.afStorage.ref(path);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.downloadURL = url; // with this you can use it in the html
      console.log('downloadurl ' + this.downloadURL);
      
      if (this.downloadURL) {
        this.readyToUpload.push(this.downloadURL);
        this.uploadImage = false;
        this.downloadURL = '';
      }
      // if (this.downloadURL) {
      //   this.addToDatabase();
      // }
      });
    });

   
  }

  onSubmit() {
  
    this.submitData().subscribe((response) => {
    console.log('response from POST API is ', response);
    });
  }
  
  submitData() {
    return this.http.post('api/admin/images/uploadImages',  {content: this.readyToUpload});
  }

  deleteImage() {
    this.afStorage.ref(this.imagePathOnClick).delete();
    this.downloadURL = '';
    this.uploadImage = false;
  }

  test() {
    this.images = this.readyToUpload;
  }

  // delete(index: number) {
  //   for 
  // }

}
