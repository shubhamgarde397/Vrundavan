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

  public tab=0;
  public categories=[];
public categoryName='';
public subCatName='';
  public myFormGroup= new FormGroup({
    date:new FormControl('', Validators.required),
    category:new FormControl('', Validators.required),
    subcategory:new FormControl('', Validators.required),
    reason:new FormControl(''),
    qty:new FormControl('', Validators.required),
    amt:new FormControl('', Validators.required),
    givenFrom:new FormControl('', Validators.required),
    givenBy:new FormControl('', Validators.required),
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
    if(data==4){
      let temp={
        method:'display',
        code:'c',
      }

  
  this.apiCallservice.handleData_New_python(temp)
  .subscribe((res: any) => {
    this.categories=res.Data;
    
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

  change(tab,name,id,ii?){
    let temp={};
    console.log('hi');
    
    var a= prompt('You are changin value of '+name+' to ____');
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
          console.log(ii);
          console.log(id);
          console.log(this.categories);
          
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
