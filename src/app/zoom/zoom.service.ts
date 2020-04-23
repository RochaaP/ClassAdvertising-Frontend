import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private ZOOM_CLIENT_ID = "w5mE3K3KQdC5ib7ZVDy4Tw";//iLcPUG6S9iCPDJPxelsnA
  private redirect_URL = "https://mtute.herokuapp.com/zoom";
  private authorizationCode = "Basic dzVtRTNLM0tRZEM1aWI3WlZEeTRUdzpFdTN3OGZ0R0dSYWVJWDFJSnI2Z3M4a1RUS3dhbk41Rg==";

  constructor(private http: HttpClient) { }

  // Login direct
  public loginDirect(){
    // return "https://zoom.us/oauth/authorize?response_type=code&client_id=" + this.ZOOM_CLIENT_ID + "&redirect_uri=" + this.redirect_URL;
    return "https://zoom.us/oauth/authorize?client_id=w5mE3K3KQdC5ib7ZVDy4Tw&response_type=code&redirect_uri=https%3A%2F%2Fmtute.herokuapp.com%2Fzoom"
  }

  // Get Access Token with the code
  public getAccessToken(code: string){
    return this.http.get("api/zoom/accessToken/" + code);
    // return this.http.post("https://zoom.us/oauth/token?grant_type=authorization_code&code=" + code + "&redirect_uri=" + this.redirect_URL,{}, {
    //   headers: new HttpHeaders()
    //   .set('Authorization', this.authorizationCode)
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Access-Control-Expose-Headers', '*')
    //   .set('Access-Control-Allow-Credentials', 'true')
    // })
  }

  public refreshAccessToken(token: string){
    return this.http.get("api/zoom/refreshToken/" + token);
  }

  // Get Zoom User Details
  public getUserData(accessToken: string){
    return this.http.get("api/zoom/userDetails/" + accessToken);
    // return this.http.get("https://api.zoom.us/v2/users/me", {
    //   headers: new HttpHeaders()
    //   .set('Authorization', this.authorizationCode)
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Access-Control-Expose-Headers', '*')
    //   .set('Access-Control-Allow-Credentials', 'true')
    // });
  }

  // Get Meeting List of the Zoom User
  public getMeetingList(accessToken: string){
    return this.http.get("api/zoom/getMeetingList/" + accessToken);
    // return this.http.get("https://api.zoom.us/v2/users/me/meetings", {
    //   headers: new HttpHeaders()
    //   .set('Authorization', this.authorizationCode)
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Access-Control-Expose-Headers', '*')
    //   .set('Access-Control-Allow-Credentials', 'true')
    // });
  }
}
