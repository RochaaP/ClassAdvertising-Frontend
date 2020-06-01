import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: {id: string, data: any}[] = [
    {id: "1", data: {question: "how to create a paper?", answer: "You should have an instructor account to create a paper. If you have one, the navigate to papers view. Then, click the 'Create Paper' button in the top left side."}},
    {id: "2", data: {question: "how to upload a note?", answer: "You should have an instructor account to upload a note."}}
  ];

  constructor() { }

  ngOnInit() {
  }

}
