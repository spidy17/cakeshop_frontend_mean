import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ProductServices } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user : User;
  constructor(private productServi :ProductServices,private route: ActivatedRoute,
    private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
  }

  onCreatePost(postData: { name: string; lastname: string, email: string; password: string, address: string; })
  {
    this.http.post('http://localhost:3000/api/signup',postData)
    .subscribe(responseData => {
        console.log(responseData);
        
        alert("welcome account is created");
        this.router.navigateByUrl('/login');
      });

  }

}
