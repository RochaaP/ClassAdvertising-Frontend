import { Injectable, Output, EventEmitter } from '@angular/core';

import { MessagesServiceURL } from './messagesServiceURL';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

// tslint:disable-next-line: class-name
export class MessagesService {
    response: any;
    status: string;

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();
    @Output() statusEvent: EventEmitter<any> = new EventEmitter();

    constructor(public http: HttpClient) {}

    public getMessages(email: string) {
        this.http.post(MessagesServiceURL.getMessages(), {email}).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error during post is ', error);
        });
    }


    private setResponse(res: any) {
        this.response = res.messages;
        console.log('user set', this.response);
    }

    public getResponse() {
       return this.response;
    }

    private setStatus(status: string) {
        this.statusEvent.emit({
            status: status
        });
    }

    public getStatus() {
        return this.statusEvent;
    }


}