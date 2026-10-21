import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSetting } from './response-setting';

describe('ResponseSetting', () => {
  let component: ResponseSetting;
  let fixture: ComponentFixture<ResponseSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseSetting],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseSetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
