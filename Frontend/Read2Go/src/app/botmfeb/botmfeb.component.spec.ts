import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotmfebComponent } from './botmfeb.component';

describe('BotmfebComponent', () => {
  let component: BotmfebComponent;
  let fixture: ComponentFixture<BotmfebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotmfebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotmfebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
