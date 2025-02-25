import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePicComponent } from './title-pic.component';

describe('TitlePicComponent', () => {
  let component: TitlePicComponent;
  let fixture: ComponentFixture<TitlePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlePicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
