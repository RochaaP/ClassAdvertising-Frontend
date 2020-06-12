import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  checkoutUrl: string = "https://sandbox.payhere.lk/pay/checkout";

  constructor(
    private http: HttpClient
  ) { }

  getPaymentDetailsByUserId(userId){    
    let url = ServiceUrls.getPaymentDetails + "byUser/" + userId;
    return this.http.get(url);
  }

  getPaymentDetailsByPaymentId(paymentId){    
    let url = ServiceUrls.getPaymentDetails + "byPaymentId/" + paymentId;
    return this.http.get(url);
  }

  deletePayment(id){
    let url = ServiceUrls.getPaymentDetails + id;
    return this.http.delete(url);
  }

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
