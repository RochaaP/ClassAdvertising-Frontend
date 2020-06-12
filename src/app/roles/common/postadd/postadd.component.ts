import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../../../service/share/data.service';
import { AuthenticationService } from '../../../service/auth/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PostsService } from '../posts.service';
import { UploadFilesService } from 'src/app/service/Upload-files/upload-files.service';
import { PaymentService } from 'src/app/payments/payment.service';
import { PaymentModel } from 'src/app/payments/payment-model';


@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.scss']
})
export class PostaddComponent implements OnInit {

  paymentId: string;
  payment_id: string;
  canCreatePost: boolean = false;

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
  metaData: any;


  post: any = {
    title: '',
    description: '',
    city: '',
    district: '',
    contact: '',
  };

  MESSAGE_SUCCESS = 'POST UPDATED';
  MESSAGE_FAIL = 'POST FAILED';
  sub: any;
  status: any;

  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private data: DataService,
    private authService: AuthenticationService,
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private postsService: PostsService,
    private paymentService: PaymentService,
    private spinnerService: Ng4LoadingSpinnerService,
    private uploadFilesService: UploadFilesService,

  ) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userdetails' + this.userDetails.email);
    this.registerItem = JSON.parse(localStorage.getItem('registerItem'));
    console.log('registerItem Postadd ' + this.registerItem);
    this.uploadImage = false;    
    this.paymentId = this.route.snapshot.paramMap.get('paymentId');
    if(this.paymentId!=undefined){
      this.paymentService.getPaymentDetailsByPaymentId(this.paymentId).subscribe(res=>{
        if(res!=undefined){
          let payment: {id: string, data: any} = JSON.parse(JSON.stringify(res))[0];
          if(payment.data.status_code=="2"){
            this.payment_id = payment.id;
            this.canCreatePost = true;
          }
          else{
            this.paymentId!=undefined;
          }
        }
        this.spinnerService.hide();
      });
    }
    else{
      this.spinnerService.hide();
    }
  }

  onDrop(files: FileList) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(0));
      this.data.currentMessage.subscribe(message => this.path = message);
    }
  }

  onSubmit() {
    if(this.payment_id==undefined){
      this.openSnackBar(this.MESSAGE_FAIL);
      return;
    }
    this.spinnerService.show();

    // let userValues = {};
    const id = this.afs.createId();
    this.id = id.toString();
    this.post.metaData = this.metaData;
    this.post.contentURL = this.downloadURL;
    this.post.registerItem = this.registerItem;
    this.post.email = this.userDetails.email;
    this.post.payment_id = this.payment_id;
  
    this.status = this.postsService.addPost(this.post, this.id);
    this.sub = this.postsService.getStatus().subscribe(status => {
      if (status.status === 200) {
        console.log('here ',status.status)
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
        this.navi();
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

  lupload(event) {
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
  upload(event) {
    this.uploadImage = true;
    const tableName = 'posts';
    this.uploadFilesService.upload(event, tableName);
    this.percentageposts = this.uploadFilesService.getPercentage(); // observe percentage
    console.log(this.percentageposts);
    this.uploadFilesService.getDownloadURL().subscribe(url => {
        this.downloadURL = url.downloadURL;
    });
    this.uploadFilesService.getMetadata().subscribe(meta => {
      this.metaData = meta.metadata;
      // console.log('add note ',JSON.parse(this.metaData).fullPath);
    });
  }
  deleteFile() {
    this.spinnerService.show();
    const state = this.uploadFilesService.delete(JSON.parse(this.metaData).fullPath);
    console.log(state);
    this.spinnerService.hide();
  }

}
