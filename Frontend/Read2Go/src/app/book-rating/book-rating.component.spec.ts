import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRatingComponent } from './book-rating.component';

describe('BookRatingComponent', () => {
  let component: BookRatingComponent;
  let fixture: ComponentFixture<BookRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
