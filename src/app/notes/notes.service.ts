import { Injectable, Output, EventEmitter } from '@angular/core';

import { notesServiceURL } from './notesServiceURL';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

// tslint:disable-next-line: class-name
export class NotesService {
    response: any;
    status: string;

    @Output() responseEvent: EventEmitter<any> = new EventEmitter();
    @Output() statusEvent: EventEmitter<any> = new EventEmitter();

    constructor(public http: HttpClient) {}

    public addNote(notesDetails: object, id: string) {

        this.http.post(notesServiceURL.addNote(), {notesDetails, id}).subscribe((response: any) => {
            console.log('notes service/ addNote() / response ', response);
            // this.setResponse(response);
            // console.log(this.response.status);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error during post is ', error);
        });

    }

    public viewNote(subject: string, grade: string) {
        let params = new HttpParams();
        params = params.append('subject', subject);
        params = params.append('grade', grade);
        this.http.get(notesServiceURL.viewNote(), {params}).subscribe((response: any) => {
            // console.log('note service/ viewNotes() /response ', response);
            this.setResponse(response);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error durin get notes is ', error);
        });
    }

    // private setResponse(response: object) {
    //     this.responseEvent.emit({
    //         response
    //     });
    // }
    // public getResponse() {
    //     return this.responseEvent;
    // }
 
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
    // public static postAPIData(userValues: object) {
    //     return this.http.post('api/notes/uploadfiles', userValues);
    // }

}
