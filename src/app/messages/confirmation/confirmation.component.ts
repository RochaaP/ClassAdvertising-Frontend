import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  topic: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    ngOnInit() {
    }

    onNoClick(): void {
      this.dialogRef.close();

    }
}
