import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitFormComponent } from './commit-form.component';

describe('CommitFormComponent', () => {
  let component: CommitFormComponent;
  let fixture: ComponentFixture<CommitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
