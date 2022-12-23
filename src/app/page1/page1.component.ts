import { Component, OnInit } from '@angular/core';
import { Observable, throwError, from, fromEvent } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../assets/user';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';


const userProfileUrl: string = '../../assets/northwind.json';
// Create observer object
const myObserver = {
  next: (x:string) => console.log('Observer got a next value: ' + x),
  error: (err:any) => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
 
const observable = new Observable<string>(observer => {
   
    observer.next('Hello from a Observable!');
    observer.complete();
});



@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  birthday:Date = new Date(2021, 0, 20);
  fileSize:number = 1234567;
  users: User[] = [];
  error1:any;
  i:number=1;
  el: HTMLParagraphElement = document.getElementById('p1') as HTMLParagraphElement;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var t = this.http.get<User[]>(userProfileUrl).subscribe (
        data => {
          this.users = data;
          
        }, // success path
        error => {
          this.error1 = error; // error path
          },
        () => {
          console.log('Observer got a complete notification');
       
      }
    );
    observable.subscribe(
    
      data => {
        console.log(data);
       
      }
    
   );
 
   var p1 = document.getElementById('p1');
   var btn1 = document.getElementById('btn1');
 
    if (  btn1!=null)
    {
      var mouseMoves = fromEvent(btn1, 'click');
      mouseMoves.subscribe(
        data => {
          this.i++;
          if (p1!=null ) 
            p1.innerHTML =  'btn1 clicked ' + this.i.toString();
        }   
      );
    }


  
  }
 

  getUserProfile() {
    return this.http.get(userProfileUrl);
  }
}
