import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from 'src/app/roles/roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {


  MESSAGE_SUCCESS = 'FAQS UPDATED';
  MESSAGE_FAIL = 'GETTING FAQS FAILED';
  subGetFAQ: any;
  faqs: any;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllFAQs();
  }

  getAllFAQs() {
    this.spinnerService.show();
    this.rolesService.getFAQs();
    this.subGetFAQ = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.faqs = this.rolesService.getResponse();
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
