import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundaliNorthChartComponent } from './kundali-north-chart.component';

describe('NgxKundaliNorthChartComponent', () => {
  let component: KundaliNorthChartComponent;
  let fixture: ComponentFixture<KundaliNorthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundaliNorthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundaliNorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
