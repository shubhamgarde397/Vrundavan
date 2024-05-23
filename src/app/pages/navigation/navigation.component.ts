import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  public entry=false;
  public show = false;
  public s1=false;
  public s2=false;
  public s3=false;
  public s4=false;
  public s5=false;
  public s6=false;
  public innerDiv=[[{'add':false,'display':false}]]
  public byTruckName=false;

  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public location: Location,
    public hd:HandleDataService,
    public securityCheck: SecurityCheckService,
    public spin: Ng4LoadingSpinnerService,
    public obs: ObsServiceService,
    public hF: handleFunction,
    public formBuilder: FormBuilder,
    public spinnerService: Ng4LoadingSpinnerService,
  ) { }

  
  ngOnInit() {
    
  }

  divChange(data){
    this.s1=false;
    this.s2=false;
    this.s3=false;
    this.s4=false;
    this.s5=false;
    this.s6=false;
    switch (data) {
      case 1:
        this.s1=true
        // this.router.
        break;

        case 2:
          this.s2=true;
        break;
        case 3:
          this.s3=true;
        break;
        case 4:
          this.s4=true;
        break;
        case 5:
          this.s5=true;
        break;
        case 6:
          this.s6=true;
        break;
    }
  }




}


