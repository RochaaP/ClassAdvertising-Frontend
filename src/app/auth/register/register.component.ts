import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AuthenticationService } from '../../service/auth/authentication.service';
import { Observable } from 'rxjs';
// import { DataService } from "../../service/share/data.service";
import { map, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


interface User {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  university: string;
  profileImagePath: string;
}
interface UserId extends User {
  id: string;
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

  userCol: AngularFirestoreCollection<User>;
  users: any;

  postDoc: AngularFirestoreDocument<User>;
  post: Observable<User>;

  id = '';
  parentMessage = 'message from parent';
  itemTemp: string[];
  name: string;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };




  // items : Observable<any[]>;

  constructor(
    private authService: AuthenticationService,
    private afs: AngularFirestore,
    private http: HttpClient,
    public router: Router
    // private data: DataService
    ) {

    this.selectedVal = 'login';
    this.isForgotPassword = false;
    this.editUserProfile = false;
    this.registerItem = 'person';
    this.loginView = true;
    // this.items = db.list('items').valueChanges();
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
        // this.isUserLoggedIn();
        this.getReg();
        // this.getid();
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  getReg() {
    this.getUserRegData().subscribe((response) => {
      // console.log('response from is ', response[0].data);
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
      return this.http.post('api/register/getUserRegData', {email: this.emailInput});
    }
  // getid() {
  //   this.userCol = this.afs.collection('users', ref => ref.where('email', '==', this.emailInput));
  //   this.users = this.userCol.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data() as User;
  //         const id = a.payload.doc.id;
  //         this.id = id;
  //         return {id, data};
  //       });
  //   })
  //   );

  // }
  ngOnInit() {
    this.isUserLoggedIn();
    this.registerItem =  JSON.parse(localStorage.getItem('registerItem'));
    this.circleView = false;

    // this.userCol = this.afs.collection('users');
    // this.users = this.userCol.snapshotChanges().pipe(
    //   map(actions =>{
    //     return actions.map(a=>{
    //       const data = a.payload.doc.data() as User;
    //       const id = a.payload.doc.id;
    //       return {id,data};
    //     })
    // })
    // )
  }

  getPost(postId) {
    this.postDoc = this.afs.collection('users').doc(postId);
    this.post = this.postDoc.valueChanges();
  }
//// circle click on Person
registerPerson() {
  this.registerItem = 'person';
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
      .then(res => {

        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage('success', 'Registration Successful! Please Verify Your Email');

          console.log(this.id);

        }, err => {
          this.showMessage('danger', err.message);
        });
        this.onSubmit();
        this.isUserLoggedIn();
        this.navi();
      }, err => {
        this.showMessage('danger', err.message);
      });
  }

  // onSubmit() {
  //   const id = this.afs.createId();
  //   this.id = id.toString();

  //   localStorage.setItem('registerItem', this.registerItem);

  //   this.afs.collection('emailAddresses').doc(id).set({
  //     email: this.emailInput,
  //     registerItem: this.registerItem,
  //     create: firebase.firestore.FieldValue.serverTimestamp()
  //   })
  //   .then(function() {
  //     console.log('Document successfully written!');
  //   })
  //   .catch(function(error) {
  //       console.error('Error writing document: ', error);
  //  });

  //   if (this.registerItem == 'person') {
  //     this.afs.collection('users').doc(id).set({
  //       email: this.emailInput,
  //       firstname: this.firstNameInput,
  //       lastname: this.lastNameInput,
  //       contact: this.contactInput,
  //       university: this.universityInput,
  //       profileimagepath: this.profileimagepathInput
  //     })
  //     .then(function() {
  //       console.log('Document successfully written!');
  //     })
  //     .catch(function(error) {
  //         console.error('Error writing document: ', error);
  //    });
  //   } else if (this.registerItem = 'institute') {
  //     this.afs.collection('institute').doc(id).set({
  //       profileImagePath: this.downloadURL,
  //       email: this.emailInput,
  //       name: this.nameInput,
  //       contact: this.contactInput,
  //       streetNo1: this.street1Input,
  //       streetNo2: this.street2Input,
  //       city: this.cityInput,
  //       town: this.townInput,
  //       province: this.provinceInput
  //     })
  //     .then(function() {
  //       console.log('Document successfully written!');
  //     })
  //     .catch(function(error) {
  //         console.error('Error writing document: ', error);
  //    });
  //   }

  // }

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

    if (this.registerItem === 'person') {
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
      console.log('response from POST API is ', response);
    }, (error) => {
      console.log('error during post is ', error);
    });

  }

  postAPIData(userValues: object) {
    return this.http.post('api/postRegData', JSON.stringify(userValues), this.httpOptions );
  }

  editProfileInstitute() {
    console.log('thisuser item ' + this.registerItem);
    this.router.navigate(['/editprofile/institute']);
  }
  editClassesInstitute() {
    this.router.navigate(['/addclasses/institute']);
  }
  editProfilePerson() {
    console.log('thisuser item ' + this.registerItem);
    this.router.navigate(['/editprofile/person']);
  }
  editClassesPerson() {
    this.router.navigate(['/addclasses/person']);
  }
  navi() {
    this.router.navigate(['/']);
    localStorage.setItem('needToReloadPage', 'true');

  }
}
