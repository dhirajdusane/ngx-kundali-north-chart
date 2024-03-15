import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

//  it('normal arudha pada should be correct',() => {
//    let arudha = service.getArudhaPada(5,6);
//    expect(arudha).toBe(7);
//
//    arudha = service.getArudhaPada(10,12);
//    expect(arudha).toBe(2);
//  })
//
//  it('arudha pada and planet in same house should be correct',() => {
//    const arudha = service.getArudhaPada(5,5);
//    expect(arudha).toBe(2);
//  })
//
//  it('arudha pada and planet in sama sptaka should be correct',() => {
//    const arudha = service.getArudhaPada(12,6);
//    expect(arudha).toBe(9);
//  })
//
  it('arudha pada array should not have negative number',() => {
    const arudha = service.getArudhaPadaArray([1,11,8,12,9,1,4,12,6],6);
    expect(arudha.length).toBe(12)
    arudha.forEach(element => {
      expect(element).toBeGreaterThan(0);
    });    
  })
});
