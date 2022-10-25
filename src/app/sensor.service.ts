import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

export interface SENSORS {
  id: number;
  name: string;
  battery: string;
  charge: string;
  parkingArea: PA[];
  maintainer: M[];
}

export interface PA {
  latitude: string;
  longitude: string;
  address: string;
  value: boolean;
}

export interface M {
  ownerName: string;
  ownerSurname: string;
  company: string;
  phoneNumber: any;
  mail: string;
  toBeRepaired: boolean;
  toBeCharged: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private url = 'assets/getAllSensorData.json';

  constructor(private http: HttpClient) {}

  getSensorData(): Observable<SENSORS[]> {
    return this.http.get<SENSORS[]>(this.url);
  }

}