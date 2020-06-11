import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GuardInsService {

  constructor(
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sharedService.getLoggedInUser()!=undefined && (this.sharedService.getLoggedInUser().data.role=="instructor" || this.sharedService.getLoggedInUser().data.role=="institute")) {
      return true;
    }
    else{      
      this.showSnackBar("You have no access for this feature");
    }
    console.log(state.url);
    this.router.navigate(['/']);
    return false;
  }

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }
}
