import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { SENSORS } from '../sensor.service';
import { SensorService } from '../sensor.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  sensors: SENSORS[] = [];
  loginSuccess: number = 0;
  isSubmitted:boolean = false;

  constructor(
    private router: Router, 
    public authService: AuthService, 
    private formbuilder: FormBuilder,
    private sensorsService: SensorService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required ]
    })
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.isSubmitted = true;
    this.sensorsService
      .getSensorData()
      .subscribe(data => {
        this.sensors = data;
        for (let i = 0; i <= this.sensors.length; ++i) {
          if (this.sensors[i].maintainer[0].mail == this.loginForm.get('email')!.value) {
            this.loginSuccess = 1;
            break;} 
        }
        if (this.loginSuccess == 1) {
          this.authService.login(this.loginForm.get('email')!.value);
          this.router.navigateByUrl("/maintainer");
        }
      });
    this.loginSuccess = 2;
  }
}
