import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  checkoutUrl: string = "https://sandbox.payhere.lk/pay/checkout";

  constructor(
    private http: HttpClient
  ) { }

  payUsingPayHere(payment){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin' : '*'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.checkoutUrl, payment, requestOptions);
  }
}
