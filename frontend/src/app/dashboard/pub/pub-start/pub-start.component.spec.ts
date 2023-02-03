import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubStartComponent } from './pub-start.component';

describe('PubStartComponent', () => {
  let component: PubStartComponent;
  let fixture: ComponentFixture<PubStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
