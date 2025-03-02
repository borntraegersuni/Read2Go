import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookprogressComponent } from './bookprogress.component';

describe('BookprogressComponent', () => {
  let component: BookprogressComponent;
  let fixture: ComponentFixture<BookprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookprogressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
