import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZoomMeeting } from './models/zoom-meeting';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private ZOOM_CLIENT_ID = environment.zoom.zoomClientId
  private redirect_URL = environment.zoom.redirect_url;

  constructor(private http: HttpClient) { }

  public isTokenExpired(){
    let curTime = new Date().getTime();
    let expiryTime = Number(localStorage.getItem("zoomAccessTokenExpiry"));
    if(curTime>=expiryTime){
      return true;
    }
    else{
      return false;
    }
  }

  // Login direct
  public loginDirect(){
    return "https://zoom.us/oauth/authorize?client_id="+ this.ZOOM_CLIENT_ID + "&response_type=code&redirect_uri=" + this.redirect_URL;
  }

  // Get Access Token with the code
  public getAccessToken(code: string){
    return this.http.get("api/zoom/accessToken/" + code);
  }

  // Refresh Access Token with the refresh_access_token
  public refreshAccessToken(token: string){
    return this.http.get("api/zoom/refreshToken/" + token);
  }

  // Get Zoom User Details
  public getUserData(accessToken: string){
    return this.http.get("api/zoom/userDetails/" + accessToken);
  }

  // Get Meeting List of the Zoom User
  public getMeetingList(accessToken: string){
    return this.http.get("api/zoom/meetings/" + accessToken);
  }

  // Create a Meeting using the logged in User
  public createMeeting(meeting: ZoomMeeting, accessToken: string){
    return this.http.post("api/zoom/meetings/", {token: accessToken, meeting: meeting});
  }
}
