import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //INjecting account service to check if we have authenticated user
  constructor(private accountService:AccountService,private router:Router){}

  //returning boolean value of true if user is allowed to proceed with the route based on authentication
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      //authguard automaticaly subscribe/unsubscribe the observable
    return this.accountService.currentUser$.pipe(
      map(auth=>{
        if(auth) return true;
        else{
//using navigate so that once user logged in we can redirect the user to route actually user tried before loggedin
          this.router.navigate(['/account/login'],{queryParams:{returnUrl:state.url}});
          return false;
        }
      })
    );
  }
  
}
