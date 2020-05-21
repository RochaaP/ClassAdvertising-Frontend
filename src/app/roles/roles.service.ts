import { Injectable, Output, EventEmitter } from '@angular/core';

import { RolesServiceURL } from './rolesServiceURL';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

// tslint:disable-next-line: class-name
export class RolesService {
    response: any;
    status: string;

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();
    @Output() statusEvent: EventEmitter<any> = new EventEmitter();

    constructor(public http: HttpClient) {}

    public getUsers() {
        this.http.get(RolesServiceURL.viewUsers()).subscribe((response: any) => {
            console.log('roles service/ viewusers() / response ', response);
            this.setResponse(response);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error during post is ', error);
        });
    }
    private setResponse(res: any) {
        this.response = res.userDetails;
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