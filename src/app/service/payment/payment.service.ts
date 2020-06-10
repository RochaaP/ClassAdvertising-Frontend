import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  checkoutUrl: string = "https://sandbox.payhere.lk/pay/checkout";

  constructor(
    private http: HttpClient
  ) { }

  payUsingPayHere(payment){

    return this.http.post(this.checkoutUrl, payment);
  }
}
