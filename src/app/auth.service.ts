import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  public login(mail: string) {
    localStorage.setItem("token", mail);
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }

}