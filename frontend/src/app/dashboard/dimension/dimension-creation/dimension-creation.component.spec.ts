import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionCreationComponent } from './dimension-creation.component';

describe('DimensionCreationComponent', () => {
  let component: DimensionCreationComponent;
  let fixture: ComponentFixture<DimensionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
