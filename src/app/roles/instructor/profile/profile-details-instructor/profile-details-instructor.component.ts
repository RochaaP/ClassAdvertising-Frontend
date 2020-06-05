import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectService } from 'src/app/subjects/subject.service';
import { WsType } from 'src/app/util/ws-type';
import { WsResponse } from 'src/app/util/ws-response';
import { SubjectModel } from 'src/app/subjects/subject-model';

@Component({
  selector: 'app-profile-details-instructor',
  templateUrl: './profile-details-instructor.component.html',
  styleUrls: ['./profile-details-instructor.component.scss']
})
export class ProfileDetailsInstructorComponent implements OnInit {

  @Input() childMessage: string;

  response: any;
  panelOpenState = false;
  subjectList: String[] = [];

  constructor(
    private http: HttpClient,
    private subjectService: SubjectService
  ) { }


  ngOnInit() {
    this.response = this.childMessage;
    this.subjectService.getSubjects(this);
  }

  onSuccess(data: WsResponse, serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
      console.log(data.payload);
      let subjects: {id: string, data: SubjectModel}[] = data.payload;
      let registeredSubjectIdArray = this.response[0].data.units;
      if(subjects!=undefined){
        subjects.forEach(element => {
          if(registeredSubjectIdArray != undefined && registeredSubjectIdArray.length != 0){
            registeredSubjectIdArray.includes(element.id)? this.subjectList.push(element.data.name):"";
          }
        });
      }
    }
  }

  onFail(serviceType: WsType){
    if(serviceType == WsType.GET_SUBJECTS){
    }
  }
}

