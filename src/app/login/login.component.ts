import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/auth/authentication.service';
import { SharedService } from '../shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectService } from '../subjects/subject.service';
import { WsResponse } from 'src/app/util/ws-response';
import { WsType } from 'src/app/util/ws-type';
import { SubjectModel } from '../subjects/subject-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from '../roles/roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subjectGroup: {id: string, data: SubjectModel}[] = [];

  loginView: boolean;
  isForgotPassword: boolean;
  circleView: boolean;
  selectedVal: string;
  role: string;

  userValues = {};
  id = '';
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  contactInput: string;
  passwordInput: string;
  subjectInput: [];

  responseMessage = '';
  responseMessageType = '';

  formGroupLogin: FormGroup;
  formGroupRegister: FormGroup;
  formGroupRegisterInstitute: FormGroup;
  temp: any;

  previousUrl;
  sub: any;
  response: any;


  MESSAGE_SUCCESS = 'USER REGISTERED';
  MESSAGE_FAIL = 'USER REGISTRATION FAILED. CONTACT ADMINISTRATOR';


  constructor(
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private afs: AngularFirestore,
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    private subjectService: SubjectService,
    private rolesService: RolesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.loginView = true;
    this.circleView = false;
    this.isForgotPassword = false;

    // this.spinnerService.show();
    this.subjectService.getSubjects(this);

    this.formGroupLogin = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.formGroupRegister = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contact: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),

    });

    this.formGroupRegisterInstitute = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contact: new FormControl('', [Validators.required]),
    });
    this.previousUrl = this.route.snapshot.paramMap.get('previousUrl');

  }

  loginUser() {
    this.spinnerService.show();
    this.authService.login(this.emailInput, this.passwordInput).then(res => {
      this.showMessage('success', 'Successfully Logged In!');
    }, err => {
      this.showMessage('danger', err.message);
      this.spinnerService.hide();
    });
    this.temp = this.sharedService.userLoggedInRespond().subscribe(val => {
      this.authService.setRegisterItem(JSON.parse(localStorage.getItem('loggedInUser')).data.role);
      this.authService.setUserName(JSON.parse(localStorage.getItem('loggedInUser')).data.firstname);
      this.navi();
      this.spinnerService.hide();
      this.temp.unsubscribe();
    });

  }

  // Send link on given email to reset password
  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage('success', 'Please Check Your Email');
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  // Common Method to Show Message and Hide after 5 seconds
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 5000);
  }

  // next navigation page
  navi() {
    if (this.previousUrl != undefined) {
      this.router.navigate([this.previousUrl]);
    }
    else{
      this.router.navigate(['/']);
    }
    // localStorage.setItem('needToReloadPage', 'true');
    this.sharedService.navigationRequest();
  }



  onSuccess(data: WsResponse, serviceType: WsType) {
    if (serviceType === WsType.GET_SUBJECTS) {
      if (data.payload != undefined) {
        console.log(data.payload);
        this.subjectGroup = data.payload;
      }
      this.spinnerService.hide();
    }
  }

  onFail(data: WsResponse, serviceType: WsType) {
    if (serviceType === WsType.GET_SUBJECTS) {
      this.spinnerService.hide();
    }
  }

  //// circle click on instructor
  registerInstructor() {
    this.role = 'instructor';

    this.circleView = false;
    this.loginView = false;
  }

  /// circle click Institute
  registerInstitute() {
    this.role = 'institute';

    this.circleView  = false;
    this.loginView = false;
  }

  // circle click student
  registerStudent() {
    this.role = 'student';

    this.circleView  = false;
    this.loginView = false;
  }

   // proceed which type of role is used
   public onLoginItemChange(val: string) {
    this.role = val;
  }

  registerUser() {
    this.spinnerService.show();
    const id = this.afs.createId();
    this.id = id.toString();

    this.authService.setRegisterItem(this.role);

    if (this.role === 'instructor') {
      this.authService.setUserName(this.firstNameInput);

      this.userValues = {
        id: this.id,
        registerItem: this.role,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput,
        subjects: this.subjectInput
      };
    } else if (this.role === 'institute') {
      this.authService.setUserName(this.firstNameInput);

      this.userValues = {
        id: this.id,
        registerItem: this.role,
        email : this.emailInput.trim(),
        name: this.firstNameInput.trim(),
        contact:  this.contactInput
      };
    }
    else if (this.role === 'student') {
      this.authService.setUserName(this.firstNameInput);

      this.userValues = {
        id: this.id,
        registerItem: this.role,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput,
        subject: this.subjectInput
      };
    }
    this.requestAuthentication();
  }


  requestAuthentication() {
    this.authService.register(this.emailInput, this.passwordInput).then(() => {
      // Send Varification link in email
      this.authService.sendEmailVerification().then(res => {
        this.isForgotPassword = false;
        this.showMessage('success', 'Registration Successful! Please Verify Your Email');
      }, err => {
        this.showMessage('danger', err.message);
        this.spinnerService.hide();
      });
      this.registerOnDatabase();
    }, err => {
      this.spinnerService.hide();
      this.showMessage('danger', err.message);
    });
  }

  registerOnDatabase() {
    this.rolesService.registerUser(this.userValues);
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.navi();
        this.spinnerService.hide();
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

  //  // Check localStorage is having User Data
  //  isUserLoggedIn() {
  //   let userDetails = {};
  //   userDetails = this.authService.isUserLoggedIn();
  //   const valTemp = localStorage.getItem('registerItem');
  //   if (valTemp != null) {
  //     this.role = valTemp;
  //   }
  // }

}

