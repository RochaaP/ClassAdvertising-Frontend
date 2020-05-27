import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/service/share/data.service';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/internal/Observable';
import { NotesService } from '../notes.service';
import { ThrowStmt } from '@angular/compiler';
import { UploadFilesService } from '../../service/Upload-files/upload-files.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'src/app/subjects/subject.service';
import { SubjectModel } from 'src/app/subjects/subject-model';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { UserModel } from 'src/app/users/user-model';
import { SharedService } from 'src/app/shared/shared.service';
import { isNumber } from 'util';

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
  
  subjectGroup: {id: string, data: SubjectModel}[] = [];


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

  status: any;
  metaData: any;
  note: any = {
      name: '',
      subject: '',
      grade_level: '',
      description: '',
      year: '',
  };

  loggedInUser: {id: string, data: UserModel};

  MESSAGE_SUCCESS = 'POST UPDATED';
  MESSAGE_FAIL = 'POST FAILED';
  sub: any;

  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private data: DataService,
    private authService: AuthenticationService,
    private http: HttpClient,
    public router: Router,
    private notesService: NotesService,
    private snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService,
    private uploadFilesService: UploadFilesService,
    public activeModal: NgbActiveModal,
    private subjectService: SubjectService,
    private sharedService: SharedService
  ) {
    this.loggedInUser = this.sharedService.getLoggedInUser();
   }

  ngOnInit() {
    this.spinnerService.show();
    this.userDetails = this.authService.isUserLoggedIn();
    this.subjectService.getSubjects(this);
  }

  onSubmit() {
    if(this.note.name=="" || this.note.subject=="" || this.note.grade_level=="" || this.note.description==""){
      this.openSnackBar("Please fill all required values");
      return; 
    }
    if(this.note.year=="" || isNaN(Number(this.note.year))){
      this.openSnackBar("Please select a valid year");
      return;
    }
    if(this.metaData==undefined){
      this.openSnackBar("Please upload a note");
      return;
    }
    this.spinnerService.show();
    console.log(this.note);
    // let userValues = {};
    const id = this.afs.createId();
    this.id = id.toString();
    this.note.metaData = this.metaData;
    this.note.contentURL = this.downloadURL;
    this.note.instructor = this.loggedInUser.id;

    // notes = {
    //   id: this.id,
    //   email: this.userDetails.email,
    //   title: this.titleInput,
    //   grade: this.gradeInput,
    //   subject: this.subjectInput,
    //   description: this.descriptionInput,
    //   path: this.downloadURL,
    // };
    console.log(this.note);
    this.status = this.notesService.addNote(this.note, this.id);
    this.sub = this.notesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.notesService.getResponse();
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
        this.navi();
      }
      else if (status.status === 400 || status.status === 0) {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      
      this.sub.unsubscribe();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  navi() {
    this.router.navigate(['/']);
  }



  deleteImage() {
    this.afStorage.ref(this.imagePathOnClick).delete();
    this.downloadURL = '';
    this.uploadFile = false;
  }


  upload(event) {
    this.uploadFile = true;
    const tableName = 'notes';
    this.uploadFilesService.upload(event, tableName);
    this.percentageposts = this.uploadFilesService.getPercentage(); // observe percentage
    console.log(this.percentageposts);
    this.uploadFilesService.getDownloadURL().subscribe(url => {
        this.downloadURL = url.downloadURL;
    });
    this.uploadFilesService.getMetadata().subscribe(meta => {
      this.metaData = meta.metadata;
    });
  }

  deleteFile() {
    if(this.metaData==undefined){
      return
    }
    this.spinnerService.show();
    const state = this.uploadFilesService.delete(JSON.parse(this.metaData).fullPath);    
    this.uploadFile = false;
    console.log(state);
    this.spinnerService.hide();
    // if (state === 'success') {
    //   this.openSnackBar(this.MESSAGE_SUCCESS);
    //   this.spinnerService.hide();
    //   console.log('successfull deleted');
    // }
    // else {
    //   this.openSnackBar(this.MESSAGE_FAIL);
    //   this.spinnerService.hide();

    // }
  }

  spload(event) {
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
