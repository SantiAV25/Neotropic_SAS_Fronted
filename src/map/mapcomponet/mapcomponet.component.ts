import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CreateMapComponent } from '../create-map/create-map.component';
import { MapserviceService } from '../services/mapservice.service';
import { mark } from '../models/mark';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapcomponet',
  standalone: true,
  imports: [CreateMapComponent],
  templateUrl: './mapcomponet.component.html',
  styleUrl: './mapcomponet.component.css'
})
export class MapcomponetComponent implements OnInit{
  private popup2 = L.popup();
  private map!: L.Map;
  private centroid: L.LatLngExpression = [4.5709, -74.2973];
  private mark: mark[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private mapService: MapserviceService
  ) { }

  private initMap(): void{
    
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });


    console.log("Viene Las Marks");
     console.log(this.mark);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);

    this.mark.forEach((mark) => {
      const { latitude, longitude, name, description } = mark;
      const marker = L.marker([parseFloat(latitude), parseFloat(longitude)]).addTo(this.map);
      const popupContent = `
        <b>${name}</b><br/>
        <i>${description}</i><br/>
        Latitud: ${latitude}<br/>
        Longitud: ${longitude}
      `;
      marker.bindPopup(popupContent).openPopup();
    });

   // var marker = L.marker([4.5710, -74.2974]).addTo(this.map);
    //marker.bindPopup(this.CreateMapComponent("4.5710", "-74.2974")).openPopup();

    var popup = L.popup()
    .setLatLng([4.5810, -74.2877])
    .setContent("<app-create-map></app-create-map>")
    .openOn(this.map);

    this.map.on('click', this.onMapClick, this);
}




private onMapClick(e: { latlng: L.LatLngExpression; }){
  const{lat, lng} = e.latlng as L.LatLng;
  this.popup2
  .setLatLng(e.latlng)
  .setContent(this.CreateMapComponent(lat.toString(), lng.toString()))
  .openOn(this.map);
}

private CreateMapComponent(latitude:string,longitude:string): HTMLElement{
  const creamapElement = document.createElement('div');
  const factory = this.resolver.resolveComponentFactory(CreateMapComponent);
  const componentRef = factory.create(this.injector, [], creamapElement);

  //passing the data to the componet
  componentRef.instance.latitude = latitude;
  componentRef.instance.longitude = longitude;

  this.appRef.attachView(componentRef.hostView);
  componentRef.onDestroy(() => {
    this.appRef.detachView(componentRef.hostView);
  });
  return creamapElement;
  
}

  ngOnInit(): void {

    this.mapService.getAllMarks().subscribe({
      next: (response: mark[]) => {
        //console.log('Marks', response);
        this.mark = response;
        console.log(this.mark);
        this.initMap();
      },
      error: (error) => console.error('Error occurred while getting all marks', error)
    });

    
  }
  title = 'neotropic_sas_frontedtest';

}
