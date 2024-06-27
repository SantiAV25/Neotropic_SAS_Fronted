import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapcomponetComponent } from './mapcomponet.component';

describe('MapcomponetComponent', () => {
  let component: MapcomponetComponent;
  let fixture: ComponentFixture<MapcomponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapcomponetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapcomponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
