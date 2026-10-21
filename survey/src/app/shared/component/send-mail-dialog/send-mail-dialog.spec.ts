import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailDialog } from './send-mail-dialog';

describe('SendMailDialog', () => {
  let component: SendMailDialog;
  let fixture: ComponentFixture<SendMailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMailDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SendMailDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
