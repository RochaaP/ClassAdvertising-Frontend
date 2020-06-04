import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar, MatRadioChange } from '@angular/material';
import { RolesService } from '../../roles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sub: any;
  response: any;

  MESSAGE_SUCCESS = 'SUBJECTS UPDATED';
  MESSAGE_FAIL = 'GETTING SUBJECTS FAILED';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.usersCount();
  }

  usersCount() {
    this.spinnerService.show();
    this.rolesService.getUsersCount();
    this.sub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse()[0];
        this.openSnackBar(this.MESSAGE_SUCCESS);
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


}
