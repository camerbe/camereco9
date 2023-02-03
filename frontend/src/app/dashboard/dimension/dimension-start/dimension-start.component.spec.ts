import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionStartComponent } from './dimension-start.component';

describe('DimensionStartComponent', () => {
  let component: DimensionStartComponent;
  let fixture: ComponentFixture<DimensionStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
