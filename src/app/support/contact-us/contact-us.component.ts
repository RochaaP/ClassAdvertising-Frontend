import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupportService } from '../support.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUSComponent implements OnInit {

  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supportService: SupportService,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  form = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    description: ["", [Validators.required]]
  })

  formControls = this.form.controls;

  send(){
    if(!this.form.valid){
      console.log('Validation failed');
      return;
    }
    this.spinnerService.show();
    let req: any = {
      name: this.form.value["name"],
      email: this.form.value["email"],
      description: this.form.value["description"],
      read: false
    }
    console.log(req);
    this.supportService.saveToContactUs(req)
    this.supportService.savedToContacts().subscribe(data=>{
      if(data["status"]=="OK"){
        this.router.navigateByUrl("/");
        this.spinnerService.hide();
      }
      else{
        this.spinnerService.hide();
        this.snackBar.open("Failed to save your details", 'Done', {
          duration: 5000,
        });
      }
    })
  }

}
