import { Component, OnInit } from '@angular/core';
import { PaymentModel } from '../../payments/payment-model';
import { PaymentService } from '../payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/users/user-model';
import { SharedService } from 'src/app/shared/shared.service';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initiate-payments',
  templateUrl: './initiate-payments.component.html',
  styleUrls: ['./initiate-payments.component.scss']
})
export class InitiatePaymentsComponent implements OnInit {

  faCheck = faCheckCircle;
  faTimes = faTimesCircle;

  type: string = "initial";

  payment: PaymentModel = {
    merchant_id: "1214010",
    return_url: "http://localhost:4200/payments/initiate?type=return",
    cancel_url: "http://localhost:4200/payments/initiate?type=cancel",
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
    private router: Router,
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

  viewPayments(){
    this.router.navigateByUrl("payments");
  }

}