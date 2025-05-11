import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaTypeDetailsComponent } from './pizza-type-details.component';

describe('PizzaTypeDetailsComponent', () => {
  let component: PizzaTypeDetailsComponent;
  let fixture: ComponentFixture<PizzaTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaTypeDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
