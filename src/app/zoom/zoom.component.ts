import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoomService } from './zoom.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SharedService } from '../shared/shared.service';
import { MatSnackBar } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoomMeeting } from './models/zoom-meeting';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ZoomMeetingSettings } from './models/zoom-meeting-settings';
import { ZoomMeetingRecurrence } from './models/zoom-meeting-recurrence';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  public loggedIn = false;
  private code;
  private accessToken;
  public meeting: ZoomMeeting;
  public viewZoomMeetingList: boolean = false;
  public createZoomMeeting: boolean = false;
  public zoomUser;
  public zoomMeetingList;
  
  // Create Modal Data
  public password: string = "true";
  public showSettings: boolean = false;
  public isSubmitted: boolean = false;

  constructor(private zoomService: ZoomService, 
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private sharedService: SharedService) {
      console.log(this.router.url);
     }


  ngOnInit() {
    if(this.sharedService.getZoomAccessToken()!=undefined){
      this.loggedIn = true; 
      this.accessToken = this.sharedService.getZoomAccessToken();
      this.zoomService.isTokenExpired()?this.zoomService.refreshAccessToken(this.accessToken.refresh_token).subscribe(token=>{
        this.accessToken = this.sharedService.setZoomAccessToken(token);        
        this.loadZoomData(this.accessToken);
      }):"";
    }
    else{
      // Reading Zoom Code
      this.route.queryParamMap.subscribe(params=>{
        this.code = params.get("code");
        if(this.code!=undefined){   
          this.getAccessToken();
        }
        else{
          // nothing to do
        }
      })
    }
  }  

  private initializeDummyMeetingDetails(){
    let settings: ZoomMeetingSettings = {
      "host_video": false,
      "participant_video": false,
      "cn_meeting": false,
      "in_meeting": false,
      "join_before_host": true,
      "mute_upon_entry": false,
      "watermark": true,
      "use_pmi": false,
      "approval_type": 2,
      "registration_type": 1,
      "audio": "both",
      "auto_recording": "none",
      "enforce_login": true,
      "enforce_login_domains": "",
      "alternative_hosts": "",
      "global_dial_in_countries": [],
      "registrants_email_notification": false,
      "meeting_authentication": false,
      "authentication_option": "",
      "authentication_domains": ""
    }
  
    let recurrence: ZoomMeetingRecurrence = undefined;

    this.meeting = {
      "topic": "",
      "type": 2,
      "start_time": "",
      "duration": 60,
      "timezone": "",
      "password": undefined,
      "agenda": "",
      "recurrence": recurrence,
      "settings": settings
    }
  }

  form = this.fb.group({
    topic: [undefined, [Validators.required]],
    agenda: [undefined, [Validators.required]],
    start_time: [undefined, [Validators.required]],
    duration: [undefined, [Validators.required]],
    password: ["false", []],
    passwordValue: [undefined, []],
    host_video: [false, [Validators.required]],
    participant_video: [false, [Validators.required]],
    join_before_host: [true, [Validators.required]],
    mute_upon_entry: [false, [Validators.required]],
  });
  formControls = this.form.controls;

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

  openModal(modal){
    this.password = "false";
    this.initializeDummyMeetingDetails();
    this.modalService.open(modal, {size: 'lg'});
  }

  private getAccessToken(){
    this.spinnerService.show();
    this.loggedIn = true;   
    this.zoomService.getAccessToken(this.code).subscribe(token=>{
      console.log("___getAccessToken() was called___");
      console.log(token);
      this.accessToken = this.sharedService.setZoomAccessToken(token);
    }, err=>{
      this.showSnackBar("Please login with Zoom before continue");
      this.loggedIn = false;   
    },()=>{
      this.spinnerService.hide();
      this.loadZoomData(this.accessToken);
    })
  }

  private loadZoomData(accessToken, when: string = "both"){
    this.spinnerService.show();
    when=="both" || when=="user"?
    this.zoomService.getUserData(accessToken.access_token).subscribe(user=>{
      console.log("___getUserData() was called___");
      console.log(user);
      this.zoomUser = user;
    },err=>{
      console.log(err);
      this.loggedIn = false;   
    },()=>{      
      this.createZoomMeeting = true;
    }):"";

    when=="both" || when=="meeting"?
    this.zoomService.getMeetingList(accessToken.access_token).subscribe(meetingList=>{
      if(meetingList!=undefined){              
        this.zoomMeetingList = meetingList["meetings"];
        this.zoomMeetingList.forEach(element => {
          element.start_time = new Date(element.start_time).toLocaleString();
          console.log(element);
        });
        console.log(this.zoomMeetingList);
      }
    },err=>{
      console.log(err);
      this.loggedIn = false;   
    },()=>{            
      if(this.zoomMeetingList.length!=0){
        this.viewZoomMeetingList = true;
      }
    }):"";
    this.spinnerService.hide();
  }

  public zoomLogin(){
    console.log("___zoomLogin()___");
    window.location.href = this.zoomService.loginDirect();
  }

  public joinCall(url: string){
    console.log("___joinCall()___");
    window.open(url);
  }

  public filterMeetingType(type: number){
    switch (type){
      case 1: return "Instant meeting";
      case 2: return "Scheduled meeting";
      case 3: return "Recurring meeting with no fixed time";
      case 4: return "PMI Meeting";
      case 8: return "Recurring meeting with a fixed time";
    }
  }

  public togglePassword(){
    this.password = this.form.value.password;
    if(this.password=="false"){
      this.form.value.passwordValue = undefined;
    }
  }

  public onSubmit(modal){
    if(this.form.invalid){
      console.log("Validation failed");
      return;
    }
    this.meeting.topic = this.form.value.topic;
    this.meeting.agenda = this.form.value.agenda;
    this.meeting.start_time = this.form.value.start_time;
    this.meeting.duration = this.form.value.duration;
    this.meeting.password = this.form.value.passwordValue;
    this.meeting.settings.host_video = this.form.value.host_video;
    this.meeting.settings.participant_video = this.form.value.participant_video;
    this.meeting.settings.join_before_host = this.form.value.join_before_host;
    this.meeting.settings.mute_upon_entry = this.form.value.mute_upon_entry;
    this.spinnerService.show();
    console.log(this.meeting);
    this.zoomService.createMeeting(this.meeting,this.accessToken.access_token).subscribe(res=>{
      console.log(res);
      this.spinnerService.hide();
      this.loadZoomData(this.accessToken,"meeting");
      this.modalService.dismissAll();
    },
    ()=>{
      this.spinnerService.hide();
      this.showSnackBar("Failed to create the meeting")
    })
  }

}
