import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeFormComponent } from './merge-form.component';

describe('MergeFormComponent', () => {
  let component: MergeFormComponent;
  let fixture: ComponentFixture<MergeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
