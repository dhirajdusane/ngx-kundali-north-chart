import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKundaliNorthChartComponent } from './ngx-kundali-north-chart.component';

describe('NgxKundaliNorthChartComponent', () => {
  let component: NgxKundaliNorthChartComponent;
  let fixture: ComponentFixture<NgxKundaliNorthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxKundaliNorthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxKundaliNorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
