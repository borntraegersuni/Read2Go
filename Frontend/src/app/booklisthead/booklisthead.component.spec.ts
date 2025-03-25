import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistheadComponent } from './booklisthead.component';

describe('BooklistheadComponent', () => {
  let component: BooklistheadComponent;
  let fixture: ComponentFixture<BooklistheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
