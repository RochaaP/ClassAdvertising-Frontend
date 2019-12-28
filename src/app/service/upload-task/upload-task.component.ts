import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DataService } from '../share/data.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Output() pathEmitter = new EventEmitter<string>();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  path: string;
  // message:string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private data: DataService
    ) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async () =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        // this.db.collection('files').add( { downloadURL: this.downloadURL, path });
        this.data.passMessage(this.downloadURL);
      }),
    );
    // this.path=path;
    // this.data.currentMessage.subscribe(message => this.message = message)

  }


  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


}
