import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsSetting } from './groups-setting';

describe('GroupsSetting', () => {
  let component: GroupsSetting;
  let fixture: ComponentFixture<GroupsSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsSetting],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsSetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
