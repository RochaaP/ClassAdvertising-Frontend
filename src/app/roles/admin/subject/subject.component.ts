import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';
import { RolesService } from '../../roles.service';

export interface Subjects {
  name: string;
  position: number;
  action: string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource: any;

  subGetSub: any;
  subAddSub: any;
  subsUpdSub: any;
  subsDltSub: any;
  response: any;

  editInput: string;
  addInput: string;
  id: string;

  MESSAGE_SUCCESS = 'SUBJECTS UPDATED';
  MESSAGE_UPADATE = 'SUBJECTS UPDATED, PLEASE REFRESH TO SHOW THE UPDATES';
  MESSAGE_FAIL = 'GETTING SUBJECTS FAILED';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.spinnerService.show();
    this.rolesService.getSubjects();
    this.subGetSub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.response = this.rolesService.getResponse();
        this.dataSource = this.response;
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
      this.subGetSub.unsubscribe();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  details(index: number) {
   this.editInput = this.response[index].data.name;
   this.id = this.response[index].id;
  }

  saveEdit() {
    this.spinnerService.show();
    this.rolesService.updateSubject(this.id, this.editInput);
    this.subsUpdSub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.openSnackBar(this.MESSAGE_UPADATE);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.subsUpdSub.unsubscribe();
    });
  }

  delete() {
    this.spinnerService.show();
    this.rolesService.deleteSubject(this.id);
    this.subsDltSub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.openSnackBar(this.MESSAGE_UPADATE);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.subsDltSub.unsubscribe();
    });
  }

  add() {
    this.spinnerService.show();
    this.rolesService.addSubject(this.addInput);
    this.subAddSub = this.rolesService.getStatus().subscribe(status => {

      if (status.status === 200) {
        this.getSubjects();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.subAddSub.unsubscribe();
    });
  }

}
