import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistfilterComponent } from './booklistfilter.component';

describe('BooklistfilterComponent', () => {
  let component: BooklistfilterComponent;
  let fixture: ComponentFixture<BooklistfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistfilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
