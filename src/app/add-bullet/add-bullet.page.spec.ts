import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulletPage } from './add-bullet.page';

describe('AddBulletPage', () => {
  let component: AddBulletPage;
  let fixture: ComponentFixture<AddBulletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
