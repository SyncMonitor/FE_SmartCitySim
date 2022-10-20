import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { SensorService } from './sensor.service';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  public login(mail: string) {
    localStorage.setItem("token", mail);
    this.currentUser = mail;
  }

  public getUser (): string {
    return this.currentUser;
  }

  public logout(): void {
    this.currentUser = "";
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