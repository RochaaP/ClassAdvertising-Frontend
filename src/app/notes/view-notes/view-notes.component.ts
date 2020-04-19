import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {

  response: any;
  searchedNotesList = [];

  smallerScreens: boolean;


  searchSubjectInput: string;
  searchGradeInput: string;

  notesSearchClicked: boolean;

  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.getScreenSize();
   }


   @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
        //  this.screenHeight = window.innerHeight;
        //  this.screenWidth = window.innerWidth;

         if (window.innerWidth < 768) {
            this.smallerScreens = true;
         }
         else {
           this.smallerScreens = false;
         }
        //  console.log(this.screenHeight, this.screenWidth);
   }


  ngOnInit() {
    this.notesSearchClicked = false;
    this.getAPIData().subscribe((response) => {
      console.log('response from GET API is ', response);
      this.response = response;
    }, ( error) => {
      console.log('error is ', error);
    });

  }

  getAPIData() {
    return this.http.get('/api/notes/getNotes');
  }

  viewNote(url) {
    window.open(url, '_blank');
    console.log('asdkfj' + url);
  }

  searchNotes() {
    this.searchedNotesList.splice(0, this.searchedNotesList.length);
    this.spinnerService.show();
    if ((this.searchGradeInput) && (this.searchSubjectInput)) {
      this.notesSearchClicked = true;
      // tslint:disable-next-line: forin
      for (const index in this.response) {
        const preDetails = this.response[2].data;
        if ( preDetails.grade.toLowerCase() === this.searchGradeInput.trim().toLowerCase() &&
            preDetails.subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase()) {
              this.searchedNotesList.push(this.response[index]);
        }
      }
      console.log('searchednotes' +this.searchedNotesList);

    }
    this.spinnerService.hide();
    if (this.smallerScreens) {
      window.scrollTo({top: 600, behavior: 'smooth'});
    }
  }

  searchNotesClose() {
    this.searchedNotesList.splice(0, this.searchedNotesList.length);
    this.searchGradeInput = '';
    this.searchSubjectInput = '';
    this.notesSearchClicked = false;
    // (document.getElementById('nameRadioButton') as HTMLInputElement).checked = false;
    // this.showByName = false;
  }
}
