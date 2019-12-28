import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direct-profile',
  templateUrl: './direct-profile.component.html',
  styleUrls: ['./direct-profile.component.scss']
})
export class DirectProfileComponent implements OnInit {

  registerItem: string;
  email: string;
  editUserProfile: boolean;

  constructor(public router: Router) {
    this.editUserProfile = false;
   }

  ngOnInit() {
    this.registerItem = localStorage.getItem('registerItem');
    console.log('edituser ' + this.registerItem);
    const itemTemp  = JSON.parse( localStorage.getItem('user'));
    if (itemTemp != null) {
      this.email = itemTemp.email;
    }
    console.log('iuser' + this.email);
    this.editUserProfile = true;

    // this.router.navigate(['/']);
  }

}
