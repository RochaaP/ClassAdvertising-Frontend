import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaperModel } from 'src/app/papers/paper-model';

@Component({
  selector: 'app-paper-details-modal',
  templateUrl: './paper-details-modal.component.html',
  styleUrls: ['./paper-details-modal.component.scss']
})
export class PaperDetailsModalComponent implements OnInit {

  @Input("paper") paper: {id: string, data: PaperModel};
  @Input("subjectName") subjectname: string;

  constructor(
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
  }

  private answerPaper(){
    localStorage.setItem("paper", JSON.stringify(this.paper));
    window.open("/answerpaper");
    this.activeModal.dismiss();
  }

}
