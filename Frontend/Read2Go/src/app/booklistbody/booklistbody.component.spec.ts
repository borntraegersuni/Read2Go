import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistbodyComponent } from './booklistbody.component';

describe('BooklistbodyComponent', () => {
  let component: BooklistbodyComponent;
  let fixture: ComponentFixture<BooklistbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistbodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
