import { AuthenticationService } from '../auth/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn()) {
        return true;
    }

    // navigate to login page
    this.router.navigate(['/account/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
