import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCWidgetComponent } from './bcwidget.component';

describe('BCWidgetComponent', () => {
  let component: BCWidgetComponent;
  let fixture: ComponentFixture<BCWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BCWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BCWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
