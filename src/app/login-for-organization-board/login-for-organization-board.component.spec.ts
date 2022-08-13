import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForOrganizationBoardComponent } from './login-for-organization-board.component';

describe('LoginForOrganizationBoardComponent', () => {
  let component: LoginForOrganizationBoardComponent;
  let fixture: ComponentFixture<LoginForOrganizationBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginForOrganizationBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginForOrganizationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
