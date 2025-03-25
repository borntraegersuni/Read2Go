import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingcomponentComponent } from './readingcomponent.component';

describe('ReadingcomponentComponent', () => {
  let component: ReadingcomponentComponent;
  let fixture: ComponentFixture<ReadingcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
