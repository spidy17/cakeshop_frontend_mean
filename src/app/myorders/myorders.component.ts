import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Order } from '../order.model';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  constructor(private http:HttpClient) { }
orders:Order[];
user_id:any;
  ngOnInit(): void {
    this.user_id=localStorage.getItem("user_id");

    this.http.get<{[key:string]:Order}>("http://localhost:3000/api/orders")
    .pipe(map(
      responseData => 
      {
        const postArray =[];
        for (const key in responseData)
        {
            if(responseData.hasOwnProperty(key))
            {
                postArray.push({...responseData[key],id:key})
            }
        }
      return postArray;

           
    })).subscribe(posts =>{
       this.orders = posts;

    });
  }

}
