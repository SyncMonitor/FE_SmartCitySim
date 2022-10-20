import { Component, OnInit } from '@angular/core';

import { SENSORS } from '../sensor.service';
import { SensorService } from '../sensor.service';
import { AuthService } from '../auth.service';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintainer',
  templateUrl: './maintainer.component.html',
  styleUrls: ['./maintainer.component.css']
})
export class MaintainerComponent implements OnInit {

  map: Leaflet.Map = {} as any;
  panelOpenState = false;
  sensors: SENSORS[] = [];
  blueIcon = Leaflet.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  markers: any[] = [];

  /* VARIABILI TEMPORANEE */
  sensorsTemp: SENSORS[] = [];
  info: string = "";
  c: number = 0;
  k: number = 0;
  currentUser: string | undefined;
  
  constructor(private sensorService: SensorService, private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.map = Leaflet.map("map2").setView([45.406435, 11.876761], 12);
        Leaflet.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
          maxZoom: 21,
          subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);
    this.currentUser = this.authService.getUser();


     this.sensorService
      .getSensorData()
      .subscribe(data => {
        this.sensors = data;
        for (let i = 0; i <= this.sensors.length; ++i) {
          if (this.sensors[i].maintainer[0].mail == this.currentUser) {
            this.markers[this.c] = Leaflet.marker([parseFloat(this.sensors[i].parkingArea[0].latitude), 
                                                   parseFloat(this.sensors[i].parkingArea[0].longitude)], {icon: this.blueIcon}).addTo(this.map);
            this.markers[this.c].bindPopup(this.getInfo(this.sensors[i]), {closeButton: false}); 
            this.c = this.c + 1;
          }                                                                                                 
        }
        console.log(this.markers);
      });
    
     this.sensorService
      .getSensorData()
      .subscribe(data => {
        for (let j = 0; j <= data.length; ++j) {
          if (data[j].maintainer[0].mail == this.currentUser) {
            this.sensorsTemp[this.k] = data[j];
            this.k=this.k+1;
          }
        }
      });

  }

  getInfo (sensor: SENSORS) {
    this.info = sensor.parkingArea[0].address + "<br>" + "Sensore " + sensor.name;
    return this.info;
  }

  showMarker(item: SENSORS) {
    this.map.setView([parseFloat(item.parkingArea[0].latitude), parseFloat(item.parkingArea[0].longitude)], 21);
    for (let j = 0; j <= this.markers.length; ++j) {
      if (this.markers[j].getLatLng().lat == parseFloat(item.parkingArea[0].latitude) && 
          this.markers[j].getLatLng().lng == parseFloat(item.parkingArea[0].longitude)) {
            this.markers[j].openPopup();}
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy() {
  }
}
