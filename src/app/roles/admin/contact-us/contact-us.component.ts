import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from '../../roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  subGetFAQ: any;
  response: any;


  MESSAGE_SUCCESS = 'UPDATED';
  MESSAGE_FAIL = 'GETTING FAILED';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.spinnerService.show();
    this.rolesService.getContactUs();
    this.subGetFAQ = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        console.log("hh",this.response);
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
      this.subGetFAQ.unsubscribe();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

}
