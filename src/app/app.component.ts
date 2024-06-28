import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapcomponetComponent } from '../map/mapcomponet/mapcomponet.component';
import { CreateMapComponent } from '../map/create-map/create-map.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapcomponetComponent, CreateMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'neotropic_sas_fronted';
}
