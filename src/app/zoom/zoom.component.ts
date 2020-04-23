import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoomService } from './zoom.service';

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

  constructor(private zoomService: ZoomService, private route: ActivatedRoute) { 
    // Reading Zoom Code
    this.route.queryParamMap.subscribe(params=>{
      this.code = params.get("code");
      console.log(this.code);
      if(this.code!=undefined){
        this.zoomService.getAccessToken(this.code).subscribe(token=>{
          console.log("___getAccessToken() was called___");
          console.log(token);
          this.accessToken = token;
          this.loggedIn = true;  
          this.zoomService.getUserData(this.accessToken.access_token).subscribe(user=>{
            console.log("___getUserData() was called___");
            console.log(user);
            this.zoomUser = user;
            this.createZoomMeeting = true;
          });
          this.zoomService.getMeetingList(this.accessToken.access_token).subscribe(meetingList=>{
            if(meetingList!=undefined){              
              this.zoomMeetingList = meetingList["meetings"];
              if(this.zoomMeetingList.length!=0){
                this.viewZoomMeetingList = true;
              }
            }
          })
        })
      }
      else{
        // nothing to do
      }
    })
  }

  ngOnInit() {
  }

  public zoomLogin(){
    console.log("___zoomLogin()___");
    window.location.href = this.zoomService.loginDirect();
  }

}
