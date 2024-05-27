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

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
@Input()
export class NavigationComponent implements OnInit {
  public entry=false;
  public displayName='';
  public show = false;
  public s1=false;
  public s2=false;
  public s3=false;
  public s4=false;
  public s5=false;
  public s6=false;
  public accountTF=false;
  public materialTF=false;
  public settingTF=false;
  public logoutTF=false;
  public access=[];
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
    this.displayName=this.securityCheck.dname;
    this.access=this.securityCheck.access;
    this.accountTF=this.access.filter((r)=>{return r.name==='Accounts'})[0]['access']
    this.materialTF=this.access.filter((r)=>{return r.name==='Materials'})[0]['access']
    this.settingTF=this.access.filter((r)=>{return r.name==='Settings'})[0]['access']
    this.logoutTF=this.access.filter((r)=>{return r.name==='Logout'})[0]['access']
  }

}


