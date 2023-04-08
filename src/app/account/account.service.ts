import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseurl=environment.apiUrl;
  //using an observable to hold user data so that other component can subscribe to the changes
 // private currentUserSource=new BehaviorSubject<User|null>(null);
  //currentUser$=this.currentUserSource.asObservable();

  //using replaysubject it will wait to assign value instead of null during app startup
  //so that authguard will have a value to decide the page restriction once user login
  private currentUserSource=new ReplaySubject<User|null>(1);
  currentUser$=this.currentUserSource.asObservable();

  //injecting httpclint for requests and router for redirecting once logged in 
  constructor(private http:HttpClient,private router:Router) { }

  //load currently logged in user to persist login
  loadCurrentUser(token:string|null){
    //due to replaysubject being empty and not even null during initial app load, 
    //proceed to checkout button is not re-directing to checkout/login component
    if(token===null)
    {
      this.currentUserSource.next(null);
      //returning null observable
      return of(null);
    }
    //authorization header to add in the request
    let headers=new HttpHeaders();
    //using ` to concatenate javascript with the bearer there
    headers=headers.set('Authorization',`Bearer ${token}`);
    return this.http.get<User>(this.baseurl+'account',{headers}).pipe(
      //to avoid avoid error This expression is not callable, after adding if(token===null),
      //checking if user is empty based on that returning proper observable
      map(user=>{
        if(user){
          //persisting token
        localStorage.setItem('token',user.token);
        //storing the user data in observable
        this.currentUserSource.next(user);
        return user;
        }
        else{
          return null;
        }
      })
    )
  }

  //login method
  login(values:any)
  {
    return this.http.post<User>(this.baseurl+'account/login',values)
    //to persist token returned from API so that while reopen the app it will be reused
    .pipe(
      map(user=>{
        //persisting token
        localStorage.setItem('token',user.token);
        //storing the user data in observable
        this.currentUserSource.next(user);
      })
    )
  }

  //register method
  register(values:any)
  {
    return this.http.post<User>(this.baseurl+'account/register',values)
    //to persist token returned from API so that while reopen the app it will be reused
    .pipe(
      map(user=>{
        //persisting token
        localStorage.setItem('token',user.token);
        //storing the user data in observable
        this.currentUserSource.next(user);
      })
    )
  }

  //logout method
  logout(){
    //remove persistant token data
    localStorage.removeItem('token');
    //remove user data from the observable
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  //check if email already exists
  checkEmailExists(email:string)
  {
    return this.http.get<boolean>(this.baseurl+'account/emailExists?email='+email);
  }
}
