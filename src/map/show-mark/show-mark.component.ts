import { Component, Input, input } from '@angular/core';
import { MapserviceService } from '../services/mapservice.service';

@Component({
  selector: 'app-show-mark',
  standalone: true,
  imports: [],
  templateUrl: './show-mark.component.html',
  styleUrl: './show-mark.component.css'
})
export class ShowMarkComponent {

  @Input() name: string = '';
  @Input() description: string = '';
  @Input() latitude: string = '';
  @Input() longitude: string = '';
  @Input() id: string = '';

  constructor(
    private mapService: MapserviceService
  ) { }

  deleteMark(){ 
    const mark = {
    id: this.id,
    name: this.name,
    description: this.description,
    latitude: this.latitude,
    longitude: this.longitude
  };

  this.mapService.deleteMark(mark).subscribe({
    next: (response) => {
      console.log('Mark deleted', response);
      alert('Mark deleted Successfully');
      window.location.reload();
    },
    error: (error) => {
      console.error('Error deleting mark', error);
    }
  });

}
    
  }





