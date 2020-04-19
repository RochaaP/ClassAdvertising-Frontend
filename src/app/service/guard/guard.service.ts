import { AuthenticationService } from '../auth/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.isUserLoggedIn()) {
    //     return true;
    // }
    if (this.authService.isUserLoggedIn() && this.sharedService.getLoggedInUser()!=undefined) {
      return true;
    }
    else{      
      this.showSnackBar("Please login before continue");
    }

    // navigate to login page
    this.router.navigate(['/account/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

}
