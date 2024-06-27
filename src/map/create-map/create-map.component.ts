import { Component, Input, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { MapserviceService } from '../services/mapservice.service';
@Component({
  selector: 'app-create-map',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-map.component.html',
  styleUrl: './create-map.component.css'
})
export class CreateMapComponent implements OnInit{
  @Input() latitude: string = "";
  @Input() longitude: string = "";

  formMark!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapserviceService
  ) {}
  ngOnInit(): void {
    this.formMark = this.formBuilder.group({
      name : [''],
      description : [''],
      latitude : [''],
      longitude : ['']
  });
}

OnSubmit(){
  this.formMark.controls['latitude'].setValue(this.latitude);
  this.formMark.controls['longitude'].setValue(this.longitude);
  console.log(this.formMark.value);
  alert('Formulario enviado');

  this.mapService.createMark(this.formMark.value).subscribe({
    next: (response) => {
      console.log('Mark added', response);
      window.location.reload();
    },
    error: (error) => console.error('Error occurred while adding a mark', error)
  });
  
}

}