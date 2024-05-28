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
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  providers: [ApiCallsService, HandleDataService],
})
export class MaterialComponent implements OnInit {
  public tab=0;
  public disableDate=false;
  public category=[];
  public summary=[];
  public subcategory=[]
  public groceryDate='';
  public table=false;
  public groceryList='';
  public gl=[];
  public monthNames = [];
  public arr=[];
  public myFormGroup= new FormGroup({
    date:new FormControl({value: '', disabled: false}, Validators.required),
    category:new FormControl('', Validators.required),
    subcategory:new FormControl('', Validators.required),
    qty:new FormControl('', Validators.required),
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
    let data=[]
    let temp1={}
    for(let i = 0;i<this.arr.length;i++){
      temp1={
        'categoryid':this.arr[i].categoryid,
        'subcategoryid':this.arr[i].subcategoryid,
        'qty':this.arr[i].qty,
        'measure':this.arr[i].measure,
        'date':this.arr[i].date
      }
      data.push(temp1);
      temp1={};
    }
    let temp=this.myFormGroup.value;
        temp={
          method:'insert',
          code:'grocerylist',
          data:data
        }    
    
    this.apiCallservice.handleData_New_python(temp)
    .subscribe((res: any) => {
      alert(res.Status);
      this.arr=[];
      this.router.navigate(['Navigation/MATERIAL/GET'])
    });
  }

  submitAmtT(){
    
    this.table=true;
    let temp={
      'category':this.category[this.myFormGroup.value.category]['categoryName'],
      'categoryid':this.category[this.myFormGroup.value.category]['categoryid'],
      'subcategory':this.category[this.myFormGroup.value.category]['subCategory'][this.myFormGroup.value.subcategory],
      'subcategoryid':this.category[this.myFormGroup.value.category]['sid'][this.myFormGroup.value.subcategory],
      'qty':this.myFormGroup.value['qty'],
      'date':this.myFormGroup.value['date'],
      'measure':this.myFormGroup.value['measure']
    }
    this.arr.push(temp);
    this.myFormGroup.patchValue({
      category:'',
      subcategory:'',
      qty:'',
      measure:'',
      date:this.myFormGroup.value.date
    })
    
    this.myFormGroup.get('date').disable();
  }

  delete(data){
    this.arr.splice(data,1)
    this.arr.length>0?this.myFormGroup.get('date').disable():this.myFormGroup.get('date').enable();;
  }
  divChangeI(data){
    if(data==1){
      let temp={
        method:'display',
        code:'c',
      }

  
  this.apiCallservice.handleData_New_python(temp)
  .subscribe((res: any) => {
    this.category=res.Data[0]['Data1'];
  });
}
    this.tab=data;
  }

  getData(){
    let temp={method:'display',code:'grocerylist',date:this.groceryDate}
        this.apiCallservice.handleData_New_python(temp)
        .subscribe((res: any) => {
          this.gl=res.Data;
          
            this.groceryList=''
          this.groceryList=this.groceryList+'*Hotel Vrundavan*\n'
            this.groceryList=this.groceryList+this.hF.getDateddmmyy(this.gl[0]['date'])
            this.groceryList=this.groceryList+'\n\n'
          for(let i=0;i<this.gl.length;i++){
            this.groceryList=this.groceryList+String(i+1);
            this.groceryList=this.groceryList+'\t'+this.gl[i].category+'-'+this.gl[i].subcategory+'\t'+this.gl[i].qty+this.gl[i].measure
            this.groceryList=this.groceryList+'\n'
          }
          this.table=true;
        });
  }

  copy(){

    var c = (<HTMLInputElement>document.getElementById('copy-text'))
        c.select();
        document.execCommand('copy');
    }

  PochBill(){//threshhold is 295
    let data=this.gl;
      var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a7',
        putOnlyUsedFonts:true
       }) 
        doc.setLineDash([1, 0], 10);
        doc.setFontSize('15');
        doc.setFontType('bold');
        doc.setTextColor(0,0,0);
        doc.text('HOTEL VRUNDAVAN',10, 5)
        doc.setFontSize('8');
        doc.text(this.hF.getDateddmmyy(this.gl[0].date),50,8)
      
        
        doc.setFontType('bold');
        doc.setFontSize('10');
      
        doc.text('Sr.',2,14)
        doc.text('Cat',12,14)
        doc.text('SubCat',32,14)
        doc.text('Quantity',49,14)
        doc.line(1, 16, 65, 16);
        // Table heading
        // Need a for loop here
        let start=23
        for(let k=0;k<data.length;k++){

          // Table rows
          // doc.line(10, start, 143, start);
      
          doc.text(String(k+1),2,start-9+6)//108-
        doc.text(data[k]['category'],11,start-9+6)
        doc.text(data[k]['subcategory'],33,start-9+6)
        doc.text(String(data[k]['qty']),50,start-9+6)
          start=start+6;
        }
        // Table square
        doc.line(1, 10, 65, 10);
        // Table square
      
            // Table heading
            doc.line(1, 10, 1, start-6);//srno
            doc.line(8, 10, 8, start-6);
            doc.line(31, 10, 31, start-6);//date
            doc.line(48, 10, 48, start-6);//truckno
            doc.line(65, 10, 65, start-6);//destination145
          doc.line(1, start-6, 65, start-6);
        // Need a for loop here
      
      doc.save(this.hF.getDateddmmyy(this.gl[0].date))
    
 }
}