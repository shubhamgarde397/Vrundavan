import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../functions/handleFunctions';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityCheckService } from '../Data/security-check.service';
import { Router } from '@angular/router';
import { ObsServiceService } from '../Data/obs-service.service';
import { HandleDataService } from '../Data/handle-data.service';


@Injectable()
export class ApiCallsService {
  private authService = new BehaviorSubject('false');
  public authSuccess = this.authService.asObservable();
  public headerPost: HttpHeaders;
  public URL = '';
  public username;
  public typeofuser=3;

  constructor(public hs: HandleDataService, public http: Http, public httpClient: HttpClient, public securityCheck: SecurityCheckService, public obs: ObsServiceService, public getfullapi: getFullApi, public handlefunction: handleFunction, public security: SecurityCheckService, public router: Router) {
    this.username = this.securityCheck.username
    this.typeofuser=this.securityCheck.typeofuser;
  }

  handleData_New_python( formBody = {}, todayDate=this.handlefunction.createDate(new Date())) {
    formBody['todayDate']=todayDate;
    formBody['website'] = 'vr';
    formBody['vrid'] = this.securityCheck.vrid;
    this.headerPost = new HttpHeaders();
    this.headerPost.append('Content-Type', 'application/json');
    this.URL = this.getfullapi.getFullAPI();
    
    return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));
      
  }


}
