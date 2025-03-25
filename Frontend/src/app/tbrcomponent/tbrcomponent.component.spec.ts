import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbrcomponentComponent } from './tbrcomponent.component';

describe('TbrcomponentComponent', () => {
  let component: TbrcomponentComponent;
  let fixture: ComponentFixture<TbrcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbrcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbrcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
