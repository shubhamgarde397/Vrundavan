import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SecurityCheckService } from '../../common/services/Data/security-check.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { PassDataService } from 'src/app/pass-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallsService]
})
export class LoginComponent implements OnInit {
  public username: any;
  public password: any;
  public otp: any;
  public show = true;
  public myFormGroup: FormGroup;
  public response: any;
  public logindetailslist;
  public financialYear;
  public dbName = 'PochDetails';
  public isLoginSuccess = false;
  public userTypeHTML;
  public userTypeTS;
  public modalUser = false;
  public loginButton = false;
  public logging=true;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public hd:HandleDataService,
    public spinnerService: Ng4LoadingSpinnerService,
    public security: SecurityCheckService,
    private obs:PassDataService
  ) {

  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  setUser() {
    this.userTypeTS = this.userTypeHTML;
      this.loginButton = false;
      this.myFormGroup.controls['username'].enable();
      this.myFormGroup.controls['password'].enable();
  }

  login(value) {
value=value.value

      this.security.setUsername(value['username']);
    this.logging=false;
      value['method'] = 'login';
      value['username']=value.username
      value['password']=value.password
      value['tablename']=''
      this.apiCallservice.handleData_New_python
        (value)
        .subscribe((res: any) => {
          this.logging=true;
          if(res['Login']){
            this.security.setDisplayname(res['Data'][0]['displayName']);
            this.security.setUserid(res['Data'][0]['_id']);
            this.security.setUserName(res['Data'][0]['name']);
            this.security.setVRid(res['Data'][0]['vrid']);
            if(this.entry(res['Data'])){
            this.isLoginSuccess=true;
            this.obs.updateApprovalMessage(res);
            this.router.navigate(['Navigation']);
            }else{
              alert('Contact Admin for registration!')
            }
          }
          else{
            alert('Contact Admin for registration!')
          }
        });
  }
  entry(data){
    return data.find(r=>{return r.type==='vr'})? true:false
  }
}
