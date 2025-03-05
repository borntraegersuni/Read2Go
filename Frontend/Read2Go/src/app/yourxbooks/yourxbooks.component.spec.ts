import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourxbooksComponent } from './yourxbooks.component';

describe('YourxbooksComponent', () => {
  let component: YourxbooksComponent;
  let fixture: ComponentFixture<YourxbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourxbooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourxbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
