import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotmdecComponent } from './botmdec.component';

describe('BotmdecComponent', () => {
  let component: BotmdecComponent;
  let fixture: ComponentFixture<BotmdecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotmdecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotmdecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
