import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonPipe } from '@angular/common';
import { UserService } from 'src/app/users/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { share } from 'rxjs/operators';
// import { loadavg } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
        if(this.sharedService.getLoggedInUser() == undefined || 
        (this.sharedService.getLoggedInUser() != undefined && userResponse.email != this.sharedService.getLoggedInUser().data.email)){
          this.userService.getUserByEmail(userResponse.email).subscribe(data=>{
            console.log(data);
            let user: {id: string, data: UserModel} = JSON.parse(JSON.stringify(data));
            this.sharedService.setLoggedInUser(user);
          },()=>{},()=>{
            this.sharedService.userLoggedInRequest();
          });
        }
      } else {
        localStorage.setItem('user', null);        
        sharedService.setLoggedInUser(null);        
        sharedService.clearZoomAccessToken();
      }
    });
  }


  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // async  loginWithGoogle() {
  //   return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  // }
  getEmitterUserName() {
    return JSON.parse(localStorage.getItem('registerUserName'));
  }

  getRegisterItem() {
    return JSON.parse(localStorage.getItem('registerItem'));
  }
}
