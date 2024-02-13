import { TestBed } from '@angular/core/testing';

import { NgxKundaliNorthChartService } from './ngx-kundali-north-chart.service';

describe('NgxKundaliNorthChartService', () => {
  let service: NgxKundaliNorthChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKundaliNorthChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
