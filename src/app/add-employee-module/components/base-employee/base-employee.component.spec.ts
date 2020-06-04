import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEmployeeComponent } from './base-employee.component';

describe('BaseEmployeeComponent', () => {
  let component: BaseEmployeeComponent;
  let fixture: ComponentFixture<BaseEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
