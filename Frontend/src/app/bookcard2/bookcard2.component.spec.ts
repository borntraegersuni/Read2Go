import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookcard2Component } from './bookcard2.component';

describe('Bookcard2Component', () => {
  let component: Bookcard2Component;
  let fixture: ComponentFixture<Bookcard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookcard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookcard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
