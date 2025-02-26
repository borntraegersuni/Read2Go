import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadertoprightComponent } from './headertopright.component';

describe('HeadertoprightComponent', () => {
  let component: HeadertoprightComponent;
  let fixture: ComponentFixture<HeadertoprightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadertoprightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadertoprightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
