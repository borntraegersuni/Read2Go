import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookClubComponent } from './book-club.component';

describe('BookClubComponent', () => {
  let component: BookClubComponent;
  let fixture: ComponentFixture<BookClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
