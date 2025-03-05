import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchheadComponent } from './searchhead.component';

describe('SearchheadComponent', () => {
  let component: SearchheadComponent;
  let fixture: ComponentFixture<SearchheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
