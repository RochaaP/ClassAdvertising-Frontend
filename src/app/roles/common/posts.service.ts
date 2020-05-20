
import { Injectable, Output, EventEmitter } from '@angular/core';

import { PostsServiceURL } from './PostServiceURL';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

// tslint:disable-next-line: class-name
export class PostsService {
    response: any;
    status: string;

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();
    @Output() statusEvent: EventEmitter<any> = new EventEmitter();

    constructor(public http: HttpClient) {}

    public addPost(postDetails: object, id: string) {
        this.http.post(PostsServiceURL.addPost(), {postDetails, id}).subscribe((response: any) => {
            console.log('post service/ addpost /response ', response);
            // this.setResponse(response);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error durin get notes is ', error);
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
