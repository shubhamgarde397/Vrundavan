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
  public truckData=[
    {
        "_id": "65b8a16067e61d27f915da02",
        "truckno": "MH45 RT 4545",
        "pan": "",
        "name": "",
        "contact": 9766707061,
        "l": 7,
        "b": 7,
        "h": 7,
        "w": 7,
        "type": "Open"
    },
    {
        "_id": "65b9c73fd7e6c0822988d235",
        "truckno": "TP12",
        "pan": "",
        "name": "",
        "contact": 123,
        "l": 1,
        "b": 7,
        "h": 7,
        "w": 7,
        "type": "Open"
    }
  ]
  public byTruckName=false;
  public myFormGroup= new FormGroup({
    truckno:new FormControl('', Validators.required),
      contact:new FormControl(''),
      l:new FormControl(''),
      b:new FormControl(7),
      h:new FormControl(7),
      w:new FormControl(7),
      type:new FormControl(''),
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

  submitAmt(){
    let temp={
      truckno:this.formatTruckNo(this.myFormGroup.value.truckno),
      contact:this.myFormGroup.value.contact,
      l:this.myFormGroup.value.l,
      b:this.myFormGroup.value.b,
      h:this.myFormGroup.value.h,
      w:this.myFormGroup.value.w,
      type:this.myFormGroup.value.type,
      method:'addtruckbasicinfo'

    }
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
     alert(res.Status)
      
    });
  
  }

  getAll(){
    let temp={
      method:'getAllTrucks'
    }
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      this.byTruckName=res.Data.length>0?true:false;
     this.truckData=res.Data;
      
    });
  }
  
  delete(i:any,j:number){
  let temp={
    method:'deleteSingle',
    _id:i._id
  }
  this.apiCallservice.handleData_New_python(temp)
  .subscribe((res: any) => {
    this.truckData.splice(j,1)
  });
  
  }
  setPAN(i,j){
    let temp={
      method:'setPan',
      truckno:i.truckno,
      pan:(<HTMLInputElement>document.getElementById('pan_'+j)).value,
      oname:(<HTMLInputElement>document.getElementById('oname_'+j)).value
    }
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status)
      this.truckData[j]['pd']=false;
    });
  }

  formatTruckNo(a){
    a=a.toUpperCase();
    let newtruck=[]
    let raw=a.replace(/ /g, "");
    newtruck.push(raw.slice(0,2))
    newtruck.push(raw.slice(2,4))
    
    if(raw.length==10){
        newtruck.push(' ')
        newtruck.push(raw.slice(4,6))	
        newtruck.push(' ')
        newtruck.push(raw.slice(6,10))	
    }
    if(raw.length==9){
        newtruck.push(' ')
        newtruck.push(raw.slice(4,5))	
        newtruck.push(' ')
        newtruck.push(raw.slice(5,9))	
    }
    if(raw.length==8){
        newtruck.push(' ')
        newtruck.push(raw.slice(4,8))	
    }
    return newtruck.join('')
  }

}


