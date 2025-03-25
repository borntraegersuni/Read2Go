import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotmjanComponent } from './botmjan.component';

describe('BotmjanComponent', () => {
  let component: BotmjanComponent;
  let fixture: ComponentFixture<BotmjanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotmjanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotmjanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
