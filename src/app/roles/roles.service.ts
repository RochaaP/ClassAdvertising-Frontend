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
            this.setResponse(response);
            this.setStatus(response.status);

        }, (error) => {
            console.log('error during post is ', error);
        });
    }

    public registerUser(userDetails: any) {
        this.http.post(RolesServiceURL.registersUsers(), userDetails).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during post is ', error);
        });
    }


    //////// instructor - view profile //////
    public getInstructor(email: string) {
        this.http.post(RolesServiceURL.getInstructor(), {email}).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during get instructor details ',error);
        });
    }

     //////// institute - view profile //////
    public getInstitute(email: string) {
        this.http.post(RolesServiceURL.getInstitute(), {email}).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during get instructor details ',error);
        });
    }

    //////// student - view profile //////
   public getStudent(email: string) {
       this.http.post(RolesServiceURL.getStudent(), {email}).subscribe((response: any) => {
           this.setResponse(response);
           this.setStatus(response.status);
       }, (error) => {
           console.log('error during get instructor details ',error);
       });
   }

    public verifyUser(email: string) {
        this.http.put(RolesServiceURL.verifyUser(), {email}).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during get instructor details ',error);
        });
    }
    ////////// Admin //////////

    /////////// Each Users Count ///////////
    public getUsersCount() {
        this.http.get(RolesServiceURL.getUsersCount()).subscribe((response: any) => {
            const count = [];
            count.push({
                instructor: response.userCount[0].instructor._size,
                institute: response.userCount[0].institute._size,
                student: response.userCount[0].student._size,
                notes: response.userCount[0].notes._size,
                posts: response.userCount[0].posts._size,
                papers: response.userCount[0].papers._size,

            });
            this.setResponseCount(count);
            console.log(count);
            this.setStatus(response.status);
        }, (error) => {
            console.log('errors during getting users count/ admin/ users count', error);
        });
    }

    /////////// get all subjects ///////////
    public getSubjects() {
        this.http.get(RolesServiceURL.getSubjects()).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during getting subjects/ admin panel ', error);
        });
    }

    //////////// Add Subject /////////////
    public addSubject(subject: string) {
        this.http.post(RolesServiceURL.addSubject(), {subject}).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during adding subject /admin panel ', error);
        });
    }
    /////////// Update Subject ///////////
    public updateSubject(id: string, subject: string) {
        this.http.put(RolesServiceURL.updateSubjects(), {id, subject}).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during updating subject /admin panel ', error);
        });
    }

    /////////// Delete Subject ///////////
    public deleteSubject(id: string) {
        this.http.delete(RolesServiceURL.deleteSubjects(id)).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during updating subject /admin panel', error);
        });
    }

    ////////// get FAQs ///////////////
    public getFAQs() {
        this.http.get(RolesServiceURL.getFAQs()).subscribe((response: any) => {
            this.setResponse(response);
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during getting subjects/ admin panel ', error);
        });
    }

    //////////// Add Subject /////////////
    public addFAQ(question: string, answer: string) {
        this.http.post(RolesServiceURL.addFAQs(), {question,answer}).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during adding subject /admin panel ', error);
        });
    }

    //////// Update FAQ ////////////
    public updateFAQ(id: string, question: string, answer: string) {
        this.http.put(RolesServiceURL.updateFAQs(), {id, question, answer}).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during updating subject /admin panel ',error);
        });
    }

     /////////// Delete Subject ///////////
     public deleteFAQ(id: string) {
        this.http.delete(RolesServiceURL.deleteFAQs(id)).subscribe((response: any) => {
            this.setStatus(response.status);
        }, (error) => {
            console.log('error during updating subject /admin panel ', error);
        });
    }

    private setResponseCount(count: any) {
        this.response = count;
    }

    private setResponse(res: any) {
        this.response = res.userDetails;
        console.log('user set');
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