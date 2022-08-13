import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStorageManagementComponent } from './admin-storage-management.component';

describe('AdminStorageManagementComponent', () => {
  let component: AdminStorageManagementComponent;
  let fixture: ComponentFixture<AdminStorageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStorageManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStorageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
