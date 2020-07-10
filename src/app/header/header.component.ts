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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = new BehaviorSubject<Userlogin>(null);

  username : string;
  constructor(private productServi :ProductServices,private http: HttpClient, private router: Router) {}

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
 
   
    this.http.get<{[key:string]:Product}>("http://localhost:3000/api/categories")
    .pipe(map(responseData => {
        const postArray =[];
        for (const key in responseData)
        {
          if(responseData.hasOwnProperty(key))
            {
                postArray.push({...responseData[key],id:key})
            }
        }

        return postArray;
           
    })).subscribe(category =>{
        console.log("category "+category);
        this.category = category;
        for(var i of this.category)
        console.log(i.name)
       //this.products = posts;
     })
   
    ;

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
