import { Injectable } from '@angular/core';
import { Consts } from '../../constants/const';
import { SecurityCheckService } from '../Data/security-check.service';
@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  public users;

  constructor(public securityCheck: SecurityCheckService) { }


  setUsers(data){
    this.users=[];
    this.users=data;
    console.log(this.users);

  }
  getUsers(){
    console.log(this.users);
    return this.users;
  }
  
}
