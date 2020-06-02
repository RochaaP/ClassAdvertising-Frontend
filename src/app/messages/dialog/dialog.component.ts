import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface DialogData {
  firstname: string;
  lastname: string;
  subject: string;
  grade: string;

  date: string;
  time: string;

  from: string;
  topic: string;
  description: string;
  
  name: string;
  email: string;
  selected: string;
  selectedTime: string;
  link: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

formGroupAppointment: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit() {
      this.formGroupAppointment = new FormGroup({
        topic: new FormControl('', [Validators.required]),
        subject: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
