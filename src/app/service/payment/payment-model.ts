export class PaymentModel {
    constructor(
        public merchant_id: string,
        public return_url: string,
        public cancel_url: string,
        public notify_url: string,
        public order_id: string,
        public items: string,
        public currency: string,
        public amount: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public phone: string,
        public address: string,
        public city: string,
        public country: string
    ){}
}
