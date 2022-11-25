import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseprofileextraComponent } from './useprofileextra.component';

describe('UseprofileextraComponent', () => {
  let component: UseprofileextraComponent;
  let fixture: ComponentFixture<UseprofileextraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseprofileextraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseprofileextraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
