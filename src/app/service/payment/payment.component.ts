import { Component, OnInit } from '@angular/core';
import { PaymentModel } from './payment-model';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payment: PaymentModel = {
    merchant_id: "1214010",
    return_url: "",
    cancel_url: "",
    notify_url: "",
    order_id: "",
    items: "Post Ad",
    currency: "LKR",
    amount: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka"
  }

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
  }

  formSubmit(){
    console.log(this.payment);

    this.paymentService.payUsingPayHere(this.payment).subscribe(res=>{

    });
  }

}
