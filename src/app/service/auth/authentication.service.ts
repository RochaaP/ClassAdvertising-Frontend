import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/users/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UserModel } from 'src/app/users/user-model';
import { validateEventsArray } from '@angular/fire/firestore';
// import { loadavg } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAdmin = false;

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
            this.setUserName(user.data.firstname);
            this.setRegisterItem(user.data.role);
            this.setIsAdmin(user.data.adminFeatures);
          },()=>{},()=>{
            this.sharedService.userLoggedInRequest();
          });
        }
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('registerItem');
        localStorage.removeItem('registerUserName');
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

  async deleteUser(){
    return await this.angularFireAuth.auth.currentUser.delete();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // async  loginWithGoogle() {
  //   return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  // }

  setUserName(username) {
    localStorage.setItem('registerUserName', JSON.stringify(username));
  }

  setRegisterItem(role) {
    localStorage.setItem('registerItem', JSON.stringify(role));
  }
  getEmitterUserName() {
    return JSON.parse(localStorage.getItem('registerUserName'));
  }

  getRegisterItem() {
    return JSON.parse(localStorage.getItem('registerItem'));
  }

  private setIsAdmin(va: boolean) {
    this.isAdmin = va;
  }

  getIsAdmin(){
    return this.isAdmin;
  }
}
