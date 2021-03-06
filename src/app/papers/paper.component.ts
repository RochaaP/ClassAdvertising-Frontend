import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {

  public divHeight: number = window.innerHeight;

  public isShowViewPaper = true;

  public isShowEditPaper = true;
  
  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.loadPaperWithDataRespond().subscribe(()=>{
      this.isShowViewPaper=false;
      this.isShowEditPaper=true;
    })
  }

}
