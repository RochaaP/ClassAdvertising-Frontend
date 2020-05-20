import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotesService } from '../notes.service';
import { MatSnackBar } from '@angular/material';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { DataService } from 'src/app/service/share/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {

  response: any;
  searchedNotesList = [];

  smallerScreens: boolean;


  subjectInput: string;
  gradeInput: string;

  notesSearchClicked: boolean;
  status: any;

  MESSAGE_SUCCESS = 'NOTES UPDATED';
  MESSAGE_FAIL = 'NOTES SEARCH FAILED';
  MESSAGE_NOT_FOUND = 'NOTES NOT FOUND';
  s: any;


  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private notesService: NotesService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private router: Router,

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
//     this.notesSearchClicked = false;
//     this.getAPIData().subscribe((response) => {
//       console.log('response from GET API is ', response);
//       this.response = response;
//     }, ( error) => {
//       console.log('error is ', error);
//     });

  }

//   triggered(email, registerItem, name){
//     console.log("___triggered()___");
//   }

//   getAPIData() {
//     return this.http.get('/api/notes/getNotes');
//   }

//   viewNote(url) {
//     window.open(url, '_blank');
//     console.log('asdkfj' + url);
//   }

//   searchNotes() {
//     this.searchedNotesList.splice(0, this.searchedNotesList.length);
//     this.spinnerService.show();
//     if ((this.searchGradeInput) && (this.searchSubjectInput)) {
//       this.notesSearchClicked = true;
//       // tslint:disable-next-line: forin
//       for (const index in this.response) {
//         const preDetails = this.response[2].data;
//         if ( preDetails.grade.toLowerCase() === this.searchGradeInput.trim().toLowerCase() &&
//             preDetails.subject.toLowerCase() === this.searchSubjectInput.trim().toLowerCase()) {
//               this.searchedNotesList.push(this.response[index]);
//         }
//       }
//       console.log('searchednotes' +this.searchedNotesList);

//     }
//     this.spinnerService.hide();
//     if (this.smallerScreens) {
//       window.scrollTo({top: 600, behavior: 'smooth'});
//     }
//   }

//   searchNotesClose() {
//     this.searchedNotesList.splice(0, this.searchedNotesList.length);
//     this.searchGradeInput = '';
//     this.searchSubjectInput = '';
//     this.notesSearchClicked = false;
//     // (document.getElementById('nameRadioButton') as HTMLInputElement).checked = false;
//     // this.showByName = false;
//   }

  searchNotes() {
    this.spinnerService.show();
    this.notesService.viewNote(this.subjectInput, this.gradeInput);
    this.s = this.notesService.getStatus().subscribe(status => {
      // this.status = status.status;

      if (status.status === 200) {
        this.response = this.notesService.getResponse();
        console.log(this.response);
        this.openSnackBar(this.MESSAGE_SUCCESS);
        this.spinnerService.hide();
      }
      else if (status.status === 404) {
        this.spinnerService.hide();
        this.openSnackBar(this.MESSAGE_NOT_FOUND);
      }
      else if (this.status === 400 || this.status === 0) {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      else {
        this.openSnackBar(this.MESSAGE_FAIL);
        this.spinnerService.hide();
      }
      this.s.unsubscribe();

    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 5000,
    });
  }

  viewNote(url) {
    window.open(url, '_blank');
    console.log('asdkfj' + url);
  }

  triggered(email: string, name: string, lastName: string) {
    this.dataService.passEmail(email);
    localStorage.setItem('navigateUser', email);
    this.router.navigate(['/profile/instructor/view/' + name + ' ' + lastName]);
  }

}
