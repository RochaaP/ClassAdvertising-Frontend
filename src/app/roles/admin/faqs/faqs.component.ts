import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RolesService } from '../../roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  subGetFAQ: any;
  subAddFAQ: any;
  subsUpdFAQ: any;
  subsDltFAQ: any;

  response: any;


  questionEditInput: string;
  answerEditInput: string;

  questionInput: string;
  answerInput: string;

  id: string;

  MESSAGE_SUCCESS = 'FAQS UPDATED';
  MESSAGE_UPADATE = 'FAQS UPDATED, PLEASE REFRESH TO SHOW THE UPDATES';
  MESSAGE_FAIL = 'GETTING FAQS FAILED';

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
        this.response = this.rolesService.getResponse();
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


  details(index: number) {
    this.questionEditInput = this.response[index].data.question;
    this.answerEditInput = this.response[index].data.answer;
    this.id = this.response[index].id;
   }

   saveEdit() {
     this.spinnerService.show();
     this.rolesService.updateFAQ(this.id, this.questionEditInput, this.answerEditInput);
     this.subsUpdFAQ = this.rolesService.getStatus().subscribe(status => {

       if (status.status === 200) {
        this.openSnackBar(this.MESSAGE_UPADATE);
        this.spinnerService.hide();
        // this.getAllFAQs();
       }
       else {
         this.openSnackBar(this.MESSAGE_FAIL);
         this.spinnerService.hide();
       }
       this.subsUpdFAQ.unsubscribe();
     });
   }

   delete() {
     this.spinnerService.show();
     this.rolesService.deleteFAQ(this.id);
     this.subsDltFAQ = this.rolesService.getStatus().subscribe(status => {

       if (status.status === 200) {
        this.openSnackBar(this.MESSAGE_UPADATE);
        this.spinnerService.hide();
       }
       else {
         this.openSnackBar(this.MESSAGE_FAIL);
         this.spinnerService.hide();
       }
       this.subsDltFAQ.unsubscribe();
     });
   }

   add() {
     this.spinnerService.show();
     this.rolesService.addFAQ(this.questionInput, this.answerInput);
     this.subAddFAQ = this.rolesService.getStatus().subscribe(status => {

       if (status.status === 200) {
        this.subAddFAQ.unsubscribe();
        this.getAllFAQs();
       }
       else {
         this.openSnackBar(this.MESSAGE_FAIL);
         this.spinnerService.hide();
       }
       this.subAddFAQ.unsubscribe();
     });
   }
  }
