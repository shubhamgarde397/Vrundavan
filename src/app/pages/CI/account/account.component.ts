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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class AccountComponent implements OnInit {
  public tab=0;
  public allist=[];
  public date2='';
  public tableData=false;
  public category=[];
  public summary=[];
  public subcategory=[]
  public all=false;
  public sum=false;
  public pendingApproval=[];
  public myFormGroup= new FormGroup({
    date:new FormControl('', Validators.required),
    category:new FormControl('', Validators.required),
    subcategory:new FormControl('', Validators.required),
    reason:new FormControl(''),
    qty:new FormControl('', Validators.required),
    amt:new FormControl('', Validators.required),
    givenFrom:new FormControl('', Validators.required),
    givenBy:new FormControl('', Validators.required),
    measure:new FormControl('', Validators.required),
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

  getSCAT(){
    this.subcategory=this.category[this.myFormGroup.value.category]['subCategory']
  }

  submitAmt(){

    let temp=this.myFormGroup.value;
        temp={
          method:'insert',
          code:'a',
          'date':this.myFormGroup.value['date'],
    'category':this.category[this.myFormGroup.value.category]['categoryid'],
    'subcategory':this.category[this.myFormGroup.value.category]['sid'][this.myFormGroup.value.subcategory],
    'reason':this.myFormGroup.value['reason'],
    'qty':this.myFormGroup.value['qty'],
    'amt':this.myFormGroup.value['amt'],
    'givenFrom':this.myFormGroup.value['givenFrom'],
    'givenBy':this.myFormGroup.value['givenBy'],
    'measure':this.myFormGroup.value['measure']
        }    
    
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status);
      
    });
  }
  divChangeI(data){
    if(data==1){
      let temp={
        method:'display',
        code:'c',
      }

  
  this.apiCallservice.handleData_New_python(temp)
  .subscribe((res: any) => {
    this.category=res.Data;
    
  });
}
    this.tab=data;
  }

  getData(){
    let temp={
      method:'display',
      code:'dpa',
    }


this.apiCallservice.handleData_New_python(temp)
.subscribe((res: any) => {
  this.pendingApproval=res.Data;
  this.tableData=res.Data.length>0?true:false;
});
  }
  approveCancel(i,j){
    var a= prompt('Please enter reason for rejection.')
    if(a==null||a==''){}
    else{
    let temp={
      method:'update',
      code:'da',
      _id:i._id,
      approval:'rejected',
      approvalReason:a
       }


this.apiCallservice.handleData_New_python(temp)
.subscribe((res: any) => {
  this.pendingApproval[j]['btn']=true;
  this.pendingApproval[j]['btnName']='Rejected';
  this.pendingApproval[j]['btnColor']='##DC4C64';
    alert(res.Status);
});
    }
  }
  approve(i,j){
    let temp={
      method:'update',
      code:'da',
      _id:i._id,
      approval:'approved',
      approvalReason:''
    }


this.apiCallservice.handleData_New_python(temp)
.subscribe((res: any) => {
  this.pendingApproval[j]['btn']=true;
  this.pendingApproval[j]['btnName']='Approved';
  this.pendingApproval[j]['btnColor']='#14A44D';
    alert(res.Status);
});
  }


  getAll(){
    let temp={
      method:'display',
      code:'debd',
      date:this.date2
    }
this.apiCallservice.handleData_New_python(temp)
.subscribe((res: any) => {
  this.allist=res.Data;
  this.all=true;
  this.sum=false;
});
  }
  getE(){
    let temp={
      method:'faceit',
      code:'summary',
      date:this.date2
    }
this.apiCallservice.handleData_New_python(temp)
.subscribe((res: any) => {
  this.summary=res.Data[0];
  this.all=false;
  this.sum=true;
}); 
  }
}






