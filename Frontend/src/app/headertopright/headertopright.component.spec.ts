import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopRightComponent } from './headertopright.component';

describe('HeadertoprightComponent', () => {
  let component: HeaderTopRightComponent;
  let fixture: ComponentFixture<HeaderTopRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTopRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTopRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
