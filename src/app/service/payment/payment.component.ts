import { Component, OnInit } from '@angular/core';
import { PaymentModel } from './payment-model';
import { PaymentService } from './payment.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/users/user-model';
import { SharedService } from 'src/app/shared/shared.service';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  faCheck = faCheckCircle;
  faTimes = faTimesCircle;

  type: string = "initial";

  payment: PaymentModel = {
    merchant_id: "1214010",
    return_url: "http://localhost:4200/payments?type=return",
    cancel_url: "http://localhost:4200/payments?type=cancel",
    notify_url: "https://www.mtute.lk/api/payments",
    order_id: "",
    items: "Post Ad",
    currency: "LKR",
    amount: "100",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka"
  }

  loggedInUser: {id: string, data: UserModel};

  constructor(
    private route: ActivatedRoute, 
    public paymentService: PaymentService,
    private sharedService: SharedService
  ) {
    this.loggedInUser = this.sharedService.getLoggedInUser();
    this.payment.order_id = this.loggedInUser.id;
    this.payment.email = this.loggedInUser.data.email;
    this.payment.first_name = this.loggedInUser.data.firstname;
    this.payment.last_name = this.loggedInUser.data.lastname;
    this.payment.phone = this.loggedInUser.data.contact;
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params=>{
      if(params.has("type")){
        this.type = params.get("type");;
      }
    })
  }

  formSubmit(){
    console.log(this.payment);

    // this.paymentService.payUsingPayHere(this.payment);
  }

}
