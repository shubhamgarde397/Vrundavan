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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class SettingsComponent implements OnInit {
  public loginTypes=[];
  public tab=0;
  public categories=[];
  public roles=[];
public categoryName='';
public subCatName='';
public myFormGroup= new FormGroup({
  dName:new FormControl('', Validators.required),
  uName:new FormControl('', Validators.required),
  pwd:new FormControl('', Validators.required),
  cpwd:new FormControl(''),
  contact:new FormControl('', Validators.required),
  logins:new FormControl('', Validators.required)
});

public myFormGroupR= new FormGroup({
  dName:new FormControl('', Validators.required),
  uName:new FormControl('', Validators.required),
  pwd:new FormControl('', Validators.required),
  cpwd:new FormControl(''),
  contact:new FormControl('', Validators.required)
});

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

  divChangeI(data){
    if(data==2){
      let temp={method:'display',code:'c',}
      this.apiCallservice.handleData_New_python(temp)
      .subscribe((res: any) => {
        this.categories=res.Data;
      });
    }

    if(data==1){
      let temp={method:'display',code:'l1','vrid':this.securityCheck.vrid}
      this.apiCallservice.handleData_New_python(temp)
        .subscribe((res: any) => {
          this.myFormGroup.patchValue(
            
            {'dName':res.Data[0].displayName,
            'uName':res.Data[0].name,
            'pwd':res.Data[0].password,
            'cpwd':res.Data[0].password,
            'contact':res.Data[0].contact,
            'logins':res.Data[0].count
            
          })
          this.loginTypes=res.Data[0]['loginTypes']
        });
      }

      if(data==3){
        let temp={method:'display',code:'roles',}
        this.apiCallservice.handleData_New_python(temp)
        .subscribe((res: any) => {
          this.roles=res.Data;
        });
      }

    this.tab=data;
  }

  addcat(data){
    let temp={};
    switch (data)  {
      case 1:
        temp={
          method:'insert',
          code:'c',
          categoryName:this.categoryName
        }    
        break;
    
      case 2:
        temp={
          method:'insert',
          code:'sc',
          subCategoryName:this.subCatName,
          categoryid:this.categoryName
        }
        break;
    }
    
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status);
      
    });
  }

  changePwd (){
    if(this.myFormGroup.value.pwd===this.myFormGroup.value.cpwd){
    let temp=this.myFormGroup.value;

        temp['method']='update',
        temp['code']='loginForm' 
        
    
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status);
      
    });
  }
  else{
    alert('Password incorrect');
  } 
  }

  changeRole(j){
    var a = parseInt(prompt('Enter the number for Role.\n\n1.Admin\n2.Employee\n3.Customer'));
    if(a===null||a===undefined){}
    else{
      let temp={};
  
          temp['method']='update'
          temp['code']='changeRole'
          temp['_id']=j
          temp['role']=a+1
      
      this.apiCallservice.handleData_New_python(temp)
      .subscribe((res: any) => {
        alert(res.Status);
        
      });
    } 
  }



  change(tab,name,id,ii?){
    let temp={};
    
    var a= prompt('You are changin value of '+name+' to ____');
    if(a===null||a===''){}
    else{
    switch (tab) {
      case 'c':
        temp={
          method:'update',
          code:tab,
          categoryName:a,
          _id:id
        }     
        break;
        case 'sc':          
        temp={
          method:'update',
          code:tab,
          subCategoryName:a,
          _id:this.categories[ii]['sid'][id]
        }     
        break;
    }
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status);
    });
  }
}

}
