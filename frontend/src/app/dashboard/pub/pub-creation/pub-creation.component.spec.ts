import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubCreationComponent } from './pub-creation.component';

describe('PubCreationComponent', () => {
  let component: PubCreationComponent;
  let fixture: ComponentFixture<PubCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
