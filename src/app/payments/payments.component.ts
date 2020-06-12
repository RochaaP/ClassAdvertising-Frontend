import { Component, OnInit } from '@angular/core';
import { PaymentModel } from './payment-model';
import { SharedService } from '../shared/shared.service';
import { UserModel } from '../users/user-model';
import { PaymentService } from './payment.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: {id: string, data: any}[] = [];

  private loggedInUser: {id: string, data: UserModel};

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private paymentService: PaymentService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.loggedInUser = this.sharedService.getLoggedInUser();
   }

  ngOnInit() {
    this.spinnerService.show();
    this.paymentService.getPaymentDetailsByUserId(this.loggedInUser.id).subscribe(res=>{
      if(res!=undefined){
        this.payments = JSON.parse(JSON.stringify(res));
        console.log(this.payments);
      }
      this.spinnerService.hide();
    })
  }

  createPost(paymentId){
    this.router.navigate(["postadd", {paymentId: paymentId}]);
  }

  deletePayment(id){
    this.spinnerService.show();
    this.paymentService.deletePayment(id).subscribe(res=>{
      this.paymentService.getPaymentDetailsByUserId(this.loggedInUser.id).subscribe(res=>{
        if(res!=undefined){
          this.payments = JSON.parse(JSON.stringify(res));
          console.log(this.payments);
        }
        this.spinnerService.hide();
      });
    })
  }

  returnPaymentStatus(code){
    if(code=="2"){return "Success"}
    else if(code=="0"){return "Pending"}
    else if(code=="-1"){return "Canceled"}
    else if(code=="-2"){return "Failed"}
    else if(code=="-3"){return "Charged Back"}
    else{return "Closed"}
  }

}
