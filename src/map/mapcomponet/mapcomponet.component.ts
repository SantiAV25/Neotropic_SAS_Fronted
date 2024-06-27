import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CreateMapComponent } from '../create-map/create-map.component';
import { MapserviceService } from '../services/mapservice.service';
import { mark } from '../models/mark';
import { Observable } from 'rxjs';
import { ShowMarkComponent } from '../show-mark/show-mark.component';

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
    
    const neotropic_icon = new L.Icon({
      iconUrl: 'https://pbs.twimg.com/profile_images/2515554926/w32d5wtlvyygx48ba9sg_400x400.png',
      iconSize: [60, 60],
      iconAnchor: [20, 20],
      popupAnchor: [1, -20]
    });

    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

     console.log(this.mark);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);

    this.mark.forEach((mark) => {
      const { latitude, longitude, name, description, id} = mark;
      const marker = L.marker([parseFloat(latitude), parseFloat(longitude)],{icon:neotropic_icon}).addTo(this.map);
      marker.bindPopup(this.CreateShowMarkComponent(name,description,id,latitude,longitude)).openPopup();
    });

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
  creamapElement.style.width = '300px'; // Ajusta el ancho según sea necesario
  creamapElement.style.height = '300px'; // Ajusta la altura según sea necesario
  creamapElement.style.overflow = 'auto'; // Asegura que el contenido no se desborde
  
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

private CreateShowMarkComponent(name:string,description:string,id:string,latitude:string,longitude:string): HTMLElement{
  const showMarkElement = document.createElement('div');
  showMarkElement.style.width = '200px'; // Ajusta el ancho según sea necesario
  showMarkElement.style.height = '200px'; // Ajusta la altura según sea necesario
  showMarkElement.style.overflow = 'auto'; // Asegura que el contenido no se desborde
  
  const factory = this.resolver.resolveComponentFactory(ShowMarkComponent);
  const componentRef = factory.create(this.injector, [], showMarkElement);

  //passing the data to the componet
  componentRef.instance.name = name;
  componentRef.instance.description = description;
  componentRef.instance.id = id;
  componentRef.instance.latitude = latitude;
  componentRef.instance.longitude = longitude;

  this.appRef.attachView(componentRef.hostView);
  componentRef.onDestroy(() => {
    this.appRef.detachView(componentRef.hostView);
  });
  return showMarkElement;
  
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
