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

  describe('getArudhaPadaArray', () => {
    it('case-1 should return the correct Arudha Pada array for valid input', () => {
      // Arrange
      const planets = [1,11,8,12,9,1,4,12,6];
      const lagna = 6; // Assuming lagna is 1 for this test case
      const expectedArudhaPadaArray = [3, 10, 6, 10, 3, 2, 4, 10, 3, 6, 8, 2];

      // Act
      const result = service.getArudhaPadaArray(planets, lagna);

      // Assert
      expect(result).toEqual(expectedArudhaPadaArray);
    });

    // Add more test cases for different scenarios
  });

  describe('getArudhaPadaArray', () => {
    it('case-2 should return the correct Arudha Pada array for valid input', () => {
      // Arrange
      const planets = [1,11,8,12,9,1,4,12,6];
      const lagna = 6; // Assuming lagna is 1 for this test case
      const expectedArudhaPadaArray = [3, 10, 6, 10, 3, 2, 4, 10, 3, 6, 8, 2];

      // Act
      const result = service.getArudhaPadaArray(planets, lagna);

      // Assert
      expect(result).toEqual(expectedArudhaPadaArray);
    });

    // Add more test cases for different scenarios
  });

  it('case-1 arudha pada array should not have negative number',() => {
    const arudha = service.getArudhaPadaArray([1,11,8,12,9,1,4,12,6],6);
    expect(arudha.length).toBe(12)
    arudha.forEach(element => {
      expect(element).toBeGreaterThan(0);
    });    
  })
});
