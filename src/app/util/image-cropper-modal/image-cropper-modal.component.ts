import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss']
})
export class ImageCropperModalComponent implements OnInit {

  @Input("imageChangedEvent") imageChangedEvent: any;
  @Output() image: EventEmitter<any> = new EventEmitter();

  croppedImageBase64: any = '';
  croppedImage: Blob;

  constructor(
    private activeModal: NgbActiveModal,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.imageChangedEvent);
  }
    
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    this.croppedImageBase64 = event.base64;
    console.log(this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
    this.showSnackBar("Failed to load Image");
  }

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

  doneCropping(){
    let block = this.croppedImageBase64.split(";");
    let contentType = block[0].split(":")[1];
    let b64Data = block[1].split(",")[1];
    let sliceSize = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    console.log(blob);
    this.image.emit({
      "imgFile": new File([blob], this.imageChangedEvent.target.files[0].name)
    });
    this.activeModal.dismiss();
  }

}
