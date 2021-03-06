import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dashboardChecked = true;
  subjectChecked = false;
  verificationChecked = false;
  faqChecked = false;
  contactChecked = false;

  ngOnInit(): void {
  }

  dashboard() {
    this.dashboardChecked = true;
    this.subjectChecked = false;
    this.verificationChecked = false;
    this.contactChecked = false;
    this.faqChecked = false;
  }

  subjects() {
    this.dashboardChecked = false;
    this.subjectChecked = true;
    this.verificationChecked = false;
    this.contactChecked = false;
    this.faqChecked = false;
  }

  verification() {
    this.dashboardChecked = false;
    this.subjectChecked = false;
    this.verificationChecked = true;
    this.contactChecked = false;
    this.faqChecked = false;
  }

  contact() {
    this.dashboardChecked = false;
    this.subjectChecked = false;
    this.verificationChecked = false;
    this.contactChecked = true;
    this.faqChecked = false;
  }

  faq() {
    this.dashboardChecked = false;
    this.subjectChecked = false;
    this.verificationChecked = false;
    this.contactChecked = false;
    this.faqChecked = true;
  }
}
