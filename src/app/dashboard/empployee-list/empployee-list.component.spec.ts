import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpployeeListComponent } from './empployee-list.component';

describe('EmpployeeListComponent', () => {
  let component: EmpployeeListComponent;
  let fixture: ComponentFixture<EmpployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
