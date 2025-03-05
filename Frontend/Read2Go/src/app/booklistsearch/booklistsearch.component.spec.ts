import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistsearchComponent } from './booklistsearch.component';

describe('BooklistsearchComponent', () => {
  let component: BooklistsearchComponent;
  let fixture: ComponentFixture<BooklistsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
