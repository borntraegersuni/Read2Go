import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomersComponent } from './newcomers.component';

describe('NewcomersComponent', () => {
  let component: NewcomersComponent;
  let fixture: ComponentFixture<NewcomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
