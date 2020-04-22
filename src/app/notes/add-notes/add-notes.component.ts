import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/service/share/data.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  fileposts: AngularFireUploadTask;
  percentageposts: Observable<number>;

  titleInput: string;
  descriptionInput: string;
  subjectInput: string;
  gradeInput: string;


  path: string;
  imagePathOnClick: string;
  message: string;
  ob: any;
  isHovering: boolean;
  uploadFile: boolean;

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

  ngOnInit() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('email '+ this.userDetails.email );
  }

  onSubmit() {
    this.spinnerService.show();

    let userValues = {};
    const id = this.afs.createId();
    this.id = id.toString();

    userValues = {
      id: this.id,
      email: this.userDetails.email,
      title: this.titleInput,
      grade: this.gradeInput,
      subject: this.subjectInput,
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
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  navi() {
    // localStorage.setItem('needToReloadPage', 'true');
    this.router.navigate(['/']);
  }

  postAPIData(userValues: object) {
    return this.http.post('api/notes/uploadfiles', userValues);
  }


  deleteImage() {
    this.afStorage.ref(this.imagePathOnClick).delete();
    this.downloadURL = '';
    this.uploadFile = false;
  }

  deleteFile(){
    console.log("___deleteFile()___");
  }

  toggleHover(event: any){
    console.log("___toggleHover()___");
  }

  onDrop(event: any){
    console.log("___onDrop()___");
  }


  upload(event) {
    this.uploadFile = true;
    const randomId = Math.random().toString(36).substring(2);
    const path = `notes/${Date.now()}_${randomId}`;
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

    });
  });

}

}
