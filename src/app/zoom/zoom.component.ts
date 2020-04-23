import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoomService } from './zoom.service';
import { LoadingService } from '../util/loading/loading.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SharedService } from '../shared/shared.service';
import { MatSnackBar } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoomMeetingSettings } from './models/zoom-meeting-settings';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  public loggedIn = false;
  private code;
  private accessToken;
  public viewZoomMeetingList: boolean = false;
  private createZoomMeeting: boolean = false;
  public zoomUser;
  public zoomMeetingList;

  constructor(private zoomService: ZoomService, 
    private route: ActivatedRoute, 
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private sharedService: SharedService) { }

  ngOnInit() {
    if(this.sharedService.getZoomAccessToken()!=undefined){
      this.loggedIn = true; 
      this.accessToken = this.sharedService.getZoomAccessToken();
      this.zoomService.refreshAccessToken(this.accessToken.refresh_token).subscribe(token=>{
        this.accessToken = this.sharedService.setZoomAccessToken(token);        
        this.loadZoomData(this.accessToken);
      });
    }
    else{
      // Reading Zoom Code
      this.route.queryParamMap.subscribe(params=>{
        this.code = params.get("code");
        console.log(this.code);
        if(this.code!=undefined){   
          this.getAccessToken();
        }
        else{
          // nothing to do
        }
      })
    }
  }

  showSnackBar(notifyMsg: string, duration: number = 2000){    
    this.snackBar.open(notifyMsg, 'Done', {
      duration: duration,
      verticalPosition: 'top'
    });
  }

  openModal(modal){
    this.modalService.open(modal);
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

  private loadZoomData(accessToken){
    this.spinnerService.show();
    this.zoomService.getUserData(accessToken.access_token).subscribe(user=>{
      console.log("___getUserData() was called___");
      console.log(user);
      this.zoomUser = user;
    },err=>{
      console.log(err);
      this.loggedIn = false;   
    },()=>{      
      this.createZoomMeeting = true;
    });
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
    });
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

  public onSubmit(formValue){
    console.log(formValue);
    let settings: ZoomMeetingSettings = {
      "host_video": false,
      "participant_video": false,
      "cn_meeting": false,
      "in_meeting": false,
      "join_before_host": true,
      "mute_upon_entry": false,
      "watermark": true,
      "use_pmi": false,
      "approval_type": 0,
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
      "authentication_domains": "",
    }
  }

}
