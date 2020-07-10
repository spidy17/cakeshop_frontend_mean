import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Category } from '../category.model';
import { Userlogin } from '../userlogin.model';

import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  user = new BehaviorSubject<Userlogin>(null);

  username : string;
  constructor(private productServi :ProductServices, private router: Router) {}

  session_set = false;


  category : Category[];
  ngOnInit(): void {
if(sessionStorage.getItem("user_name")!=null){
    this.username = sessionStorage.getItem("user_name");    
    this.session_set = true;
}
else{
  this.session_set=false;
}

  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
   
    localStorage.removeItem('userData');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');

    sessionStorage.removeItem('user_name');
    this.session_set = false;
  }

}
