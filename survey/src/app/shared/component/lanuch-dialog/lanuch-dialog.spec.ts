import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanuchDialog } from './lanuch-dialog';

describe('LanuchDialog', () => {
  let component: LanuchDialog;
  let fixture: ComponentFixture<LanuchDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanuchDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LanuchDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
