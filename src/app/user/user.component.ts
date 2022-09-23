import { Component, OnInit } from '@angular/core';

import SensorData from 'src/assets/json/getAllSensorData.json';
import * as Leaflet from 'leaflet';

interface SENSORS {
  id: number;
  name: string;
  battery: string;
  parkingArea: PA[];
}

interface PA {
  latitude: string;
  longitude: string;
  address: string;
  value: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  map: Leaflet.Map = {} as any;
  panelOpenState = false;
  sensors: SENSORS[] = SensorData;
  defaultIcon = Leaflet.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  markers: any[] = [];
  info: string = "";
  
  constructor(){
  }

  ngOnInit(): void {
    this.map = Leaflet.map("map").setView([45.406435, 11.876761], 12);
    Leaflet.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 21,
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);
    for (let i = 0; i <= this.sensors.length; ++i) {
      this.markers[i] = Leaflet.marker([parseFloat(this.sensors[i].parkingArea[0].latitude), 
                                        parseFloat(this.sensors[i].parkingArea[0].longitude)], {icon: this.defaultIcon}).addTo(this.map);
      this.markers[i].bindPopup(this.getInfo(this.sensors[i]));                                                                                            
    }
  }

  grouped = SensorData.reduce((group : any, current)=> {
    const groupingKey = `${current.parkingArea[0].address}`;
    group[groupingKey]= group[groupingKey] || [];
    group[groupingKey].push(current);
    return group;
    }, {}
  )

  getInfo (sensor: SENSORS) {
    this.info = sensor.parkingArea[0].address + "<br>" + "Sensore " + sensor.name;
    if (sensor.parkingArea[0].value){
      this.info = this.info + ": occupato";}
    else{
      this.info = this.info + ": libero";}
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
}
