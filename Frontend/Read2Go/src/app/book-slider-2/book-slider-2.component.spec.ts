import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSlider2Component } from './book-slider-2.component';

describe('BookSlider2Component', () => {
  let component: BookSlider2Component;
  let fixture: ComponentFixture<BookSlider2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSlider2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSlider2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
