import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaperModel } from 'src/app/papers/paper-model';
import { UserModel } from 'src/app/users/user-model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-paper-details-modal',
  templateUrl: './paper-details-modal.component.html',
  styleUrls: ['./paper-details-modal.component.scss']
})
export class PaperDetailsModalComponent implements OnInit {

  @Input("loggedInUser") user: {id: string, data: UserModel};
  @Input("paper") paper: {id: string, data: PaperModel};
  @Input("subjectName") subjectname: string;
  @Input("instructorName") instructorName: string;

  constructor(
    private activeModal: NgbActiveModal,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
  }

  private answerPaper(){
    this.sharedService.setLoggedInUser(this.user, "LOCAL");
    localStorage.setItem("paper", JSON.stringify(this.paper));
    window.open("/answerpaper");
    this.activeModal.dismiss();
  }

}
