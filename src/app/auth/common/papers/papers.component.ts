import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  @Input() childMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
