import { Injectable } from '@angular/core';

import { notesServiceURL } from './notesServiceURL';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })

// tslint:disable-next-line: class-name
export class NotesService {
    response: any;
    constructor(public http: HttpClient) {}

    public addNote(notesDetails: object, id: string) {

        this.http.post(notesServiceURL.addNote(), {notesDetails, id}).subscribe((response) => {
            console.log('notes service/ addNote() / response ', response);
            this.setResponse(response);
            console.log(this.response.status);
            return this.response.status;

        }, (error) => {
            console.log('error during post is ', error);
            return 0;
        });

    }

    private setResponse(response: object) {
        this.response = response;
    }
    public getResponse() {
        return this.response;
    }

    // public static postAPIData(userValues: object) {
    //     return this.http.post('api/notes/uploadfiles', userValues);
    // }

}
