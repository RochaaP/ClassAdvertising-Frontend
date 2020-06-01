import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  public viewTermsConditions: boolean = false;
  public viewPrivacy: boolean = false;
  public viewDoc: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
        //  Defaults to 0 if no query param provided.
        this.viewPrivacy = params.viewPrivacy;
        this.viewTermsConditions = params.viewTermsConditions;
        // this.page = +params['page'] || 0;
      });
  }

  public handleToggles(buttonType: string){
    switch (buttonType) {
      case 'terms':{  
        console.log('terms');
        if(this.viewTermsConditions){
          this.viewTermsConditions=false;
          this.viewPrivacy=false;
          this.viewDoc=false;
        }
        else{          
          this.viewTermsConditions=true;
          this.viewPrivacy=false;
          this.viewDoc=false;
        }
        break;
      }
      
      case 'privacy': {    
        console.log('privacy');   
        if(this.viewPrivacy){
          this.viewTermsConditions=false;
          this.viewPrivacy=false;
          this.viewDoc=false;
        }
        else{          
          this.viewTermsConditions=false;
          this.viewPrivacy=true;
          this.viewDoc=false;
        }
        break;
      }
      
      case 'doc': {    
        console.log('doc');   
        if(this.viewDoc){
          this.viewTermsConditions=false;
          this.viewPrivacy=false;
          this.viewDoc=false;
        }
        else{          
          this.viewTermsConditions=false;
          this.viewPrivacy=false;
          this.viewDoc=true;
        }
        break;
      }
      default:
        break;
    }
  }

}
