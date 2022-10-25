import { Component, OnInit } from '@angular/core';
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

  loginForm!: FormGroup;
  sensors: SENSORS[] = [];
  control: boolean | undefined;

  constructor(
    private router: Router, 
    public authService: AuthService, 
    private formbuilder: FormBuilder,
    private sensorsService: SensorService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required ]
    });
  }

  login() {
    this.sensorsService
      .getSensorData()
      .subscribe(data => {
        this.sensors = data;
        for (let i = 0; i <= this.sensors.length; ++i) {
          if (this.sensors[i].maintainer[0].mail == this.loginForm.get('email')!.value) {
            this.control = true;
            this.authService.login(this.loginForm.get('email')!.value);
            this.router.navigateByUrl("/maintainer");
            break;
          }
          else {
            this.control = false;
          }
        }
      });
  }

}
