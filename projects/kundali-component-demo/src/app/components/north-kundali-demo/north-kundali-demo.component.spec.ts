import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthKundaliDemoComponent } from './north-kundali-demo.component';

describe('NorthKundaliDemoComponent', () => {
  let component: NorthKundaliDemoComponent;
  let fixture: ComponentFixture<NorthKundaliDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NorthKundaliDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NorthKundaliDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
