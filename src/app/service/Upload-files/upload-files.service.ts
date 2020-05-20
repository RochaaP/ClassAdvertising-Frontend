import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  profileMetaData: any;
  percentage: Observable<number>;
  downloadURL: string;

  @Output() downloadurlEvent: EventEmitter<any> = new EventEmitter();
  @Output() metadataEvent: EventEmitter<any> = new EventEmitter();

    constructor(
      private afStorage: AngularFireStorage,
    ) { }


  upload(event: any, tableName: string) {
    const randomId = Math.random().toString(36).substring(2);
    const path = `${tableName}/${Date.now()}_${randomId}`;
    const uploadProfilePath = path;
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    const fileProfile = this.afStorage.upload(path, event.target.files[0]);
    fileProfile.then(data => {
      this.profileMetaData = JSON.stringify(data.metadata);
      this.setMetadata(this.profileMetaData);
    });
    // let percentageProfile = fileProfile.percentageChanges();
    this.setPercentage(fileProfile.percentageChanges());
    // The main task
    // this.task = this.afStorage.upload(path, event.target.files[0]);
    // console.log(this.task.downloadURL());
    // this.downloadURL = this.task.downloadURL();
    // console.log(this.downloadURL);
    const task = this.afStorage.upload(path, event.target.files[0]).then(() => {
      const downloadURL = ref.getDownloadURL().subscribe(url => {
      const Url = url; // for ts
      this.setDownloadURL(url); // with this you can use it in the html
      });

    });
  }

  public delete(metaDatatoDelete): string {
    let state: string;
    if (metaDatatoDelete) {
      this.afStorage.ref(metaDatatoDelete).delete().subscribe(() => {
      }, (error) => {
        console.log(error);
        state =  'error';
      }, () => {
        state = 'success';
      });
    }
    return state;
  }


  private setPercentage(percentageChanges: Observable<number>) {
    this.percentage  = percentageChanges;
  }

  public getPercentage() {
    return this.percentage;
  }

  private setDownloadURL(url: string) {
    this.downloadurlEvent.emit({
      downloadURL : url
    });
  }

  public getDownloadURL() {
    return this.downloadurlEvent;
  }

  private setMetadata(data: any) {
    this.metadataEvent.emit({
      metadata : data
    });
  }

  public getMetadata() {
    return this.metadataEvent;
  }
}
