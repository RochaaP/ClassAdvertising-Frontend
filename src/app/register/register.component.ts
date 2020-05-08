import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthenticationService } from '../service/auth/authentication.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';


interface User {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  university: string;
  profileImagePath: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'firebaseLogin';
  selectedVal: string;
  responseMessage = '';
  responseMessageType = '';

  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  contactInput: string;
  passwordInput: string;
  universityInput = '';
  profileimagepathInput = '';
  street1Input = '';
  street2Input = '';
  cityInput = '';
  townInput = '';
  provinceInput = '';
  downloadURL = '';
  nameInput: string;

  isForgotPassword: boolean;
  userDetails: any;
  editUserProfile: boolean;
  registerItem: string;
  circleView: boolean;
  loginView: boolean;
  visibleHaveAccount: boolean;

  userCol: AngularFirestoreCollection<User>;
  users: any;

  postDoc: AngularFirestoreDocument<User>;
  post: Observable<User>;

  id = '';
  parentMessage = 'message from parent';
  itemTemp: string[];
  name: string;

  previousUrl;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private afs: AngularFirestore,
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute
    ) {

    this.selectedVal = 'login';
    this.isForgotPassword = false;
    this.editUserProfile = false;
    this.registerItem = 'instructor';
    this.loginView = true;
    this.visibleHaveAccount = true;
  }

  // Common Method to Show Message and Hide after 2 seconds
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 5000);
  }

  // Called on switching Login/ Register tabs


  public onLoginItemChange(val: string) {
    this.registerItem = val;
  }

  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userdetails' + this.userDetails);
    const valTemp = localStorage.getItem('registerItem');
    if (valTemp != null) {
      this.registerItem = valTemp;
    }

    // this.itemTemp  = JSON.parse( localStorage.getItem('user'));
    // if (this.itemTemp != null) {
    //   this.emailInput = this.itemTemp.email;
    // }

  }

  // SignOut Firebase Session and Clean LocalStorage
  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
        localStorage.removeItem('registerItem');
        localStorage.removeItem('resgisterUserName');
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  // Login user with  provided Email/ Password
  loginUser() {
    this.responseMessage = '';
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage('success', 'Successfully Logged In!');
        this.isUserLoggedIn();
        // this.userService.getUserByEmail(this.emailInput).subscribe(data=>{
        //   console.log(data);
        //   let user: {id: string, data: UserModel} = JSON.parse(JSON.stringify(data));
        //   this.sharedService.setLoggedInUser(user);
        // });
        this.sharedService.userLoggedInRespond().subscribe(()=>{
          this.getReg();
        });
        // this.getid();
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  getReg() {
    this.getUserRegData().subscribe((response) => {
      console.log('register / getReg / response ', response);
      this.registerItem = response[0].reg;
      this.name = response[0].name;
      localStorage.setItem('registerUserName', JSON.stringify(response[0].name));
      localStorage.setItem('registerItem', JSON.stringify(response[0].reg));
    }, (error) => {
      console.log('error on register user ', error);
    }, () => {
      this.navi();
    });
  }

  getUserRegData() {
    return this.http.post('api/userDetails/common/getUserRegData', {email: this.emailInput});
  }

  ngOnInit() {
    this.isUserLoggedIn();
    this.registerItem =  JSON.parse(localStorage.getItem('registerItem'));
    this.circleView = false;
    this.previousUrl = this.route.snapshot.paramMap.get('previousUrl')
  }

  getPost(postId) {
    this.postDoc = this.afs.collection('users').doc(postId);
    this.post = this.postDoc.valueChanges();
  }
//// circle click on instructor
  registerInstructor() {
    this.registerItem = 'instructor';
    this.onValChange('register');

    this.circleView = false;
    this.loginView = false;
  }

  /// circle click Institute
  registerInstitute() {
    this.onValChange('register');
    this.registerItem = 'institute';

    this.circleView  = false;
    this.loginView = false;
  }

  // circle click student
  registerStudent() {
    this.onValChange('register');
    this.registerItem = 'student';

    this.circleView  = false;
    this.loginView = false;
  }

  public onValChange(val: string) {
    this.showMessage('', '');
    this.selectedVal = val;
  }

  // Register user with  provided Email/ Password
  registerUser() {
    this.authService.register(this.emailInput, this.passwordInput)
      .then(() => {

        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.visibleHaveAccount = false;

          this.showMessage('success', 'Registration Successful! Please Verify Your Email');

          console.log(this.id);

        }, err => {
          this.showMessage('danger', err.message);
        });
        this.onSubmit();
        this.isUserLoggedIn();
      }, err => {
        this.showMessage('danger', err.message);
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

  // // Open Popup to Login with Google Account
  // googleLogin() {
  //   this.authService.loginWithGoogle()
  //     .then(res => {
  //       console.log(res);
  //       this.showMessage("success", "Successfully Logged In with Google");
  //       this.isUserLoggedIn();
  //     }, err => {
  //       this.showMessage("danger", err.message);
  //     });
  // }
  onSubmit() {

    const id = this.afs.createId();
    this.id = id.toString();
    let userValues = {};
    localStorage.setItem('registerItem', JSON.stringify(this.registerItem));

    if (this.registerItem === 'instructor') {
      localStorage.setItem('registerUserName', JSON.stringify(this.firstNameInput));

      userValues = {
        id: this.id,
        registerItem: this.registerItem,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput
      };
    } else if (this.registerItem === 'institute') {
      localStorage.setItem('registerUserName', JSON.stringify(this.nameInput));

      userValues = {
        id: this.id,
        registerItem: this.registerItem,
        email : this.emailInput.trim(),
        name: this.nameInput.trim(),
        contact:  this.contactInput
      };
    }
    else if (this.registerItem === 'student') {
      localStorage.setItem('registerUserName', JSON.stringify(this.firstNameInput));

      userValues = {
        id: this.id,
        registerItem: this.registerItem,
        email : this.emailInput.trim(),
        firstName: this.firstNameInput.trim(),
        lastName: this.lastNameInput.trim(),
        contact:  this.contactInput
      };
    }

    this.postAPIData(userValues).subscribe((response) => {
      console.log('register user with', response);
    }, (error) => {
      console.log('error during post is ', error);
    });
    // this.navi();
    // this.circleView = false;
    // this.loginView = true;
    // this.selectedVal = 'login';
    this.loginUser();

  }

  postAPIData(userValues: object) {
    return this.http.post('api/userDetails/common/register', JSON.stringify(userValues), this.httpOptions );
  }

  editProfileInstitute() {
    console.log('thisuser item ' + this.registerItem);
    this.router.navigate(['/profile/institute/edit']);
  }
  editClassesInstitute() {
    this.router.navigate(['/profile/institute/classes']);
  }
  editProfileInstructor() {
    console.log('thisuser item ' + this.registerItem);
    this.router.navigate(['/profile/instructor/edit']);
  }
  editClassesInstructor() {
    this.router.navigate(['/profile/instructor/classes']);
  }
  navi() {
    if(this.previousUrl != undefined) {
      this.router.navigate([this.previousUrl]);
    }
    else{
      this.router.navigate(['/']);
    }
    // localStorage.setItem('needToReloadPage', 'true');
    this.sharedService.navigationRequest();


  }
}
