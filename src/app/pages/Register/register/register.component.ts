import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { Location } from '@angular/common';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ObsServiceService } from 'src/app/common/services/Data/obs-service.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class RegisterComponent implements OnInit {
public myFormGroupR= new FormGroup({
  dName:new FormControl('', Validators.required),
  uName:new FormControl('', Validators.required),
  pwd:new FormControl('', Validators.required),
  cpwd:new FormControl(''),
  contact:new FormControl('', Validators.required)
});
  constructor( public router: Router,
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

  register(){
    if(this.myFormGroupR.value.pwd===this.myFormGroupR.value.cpwd){
      let temp=this.myFormGroupR.value;
  
          temp['method']='insert',
          temp['code']='register' 
          
      
      this.apiCallservice.handleData_New_python(temp)
      .subscribe((res: any) => {
        alert(res.Status);
        
      });
    }
    else{
      alert('Password incorrect');
    } 
  }

}
