import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadcomponentComponent } from './readcomponent.component';

describe('ReadcomponentComponent', () => {
  let component: ReadcomponentComponent;
  let fixture: ComponentFixture<ReadcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
