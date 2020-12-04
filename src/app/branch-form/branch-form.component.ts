import { Component, EventEmitter, Output } from '@angular/core';
import { BranchOptions } from '@gitgraph/js';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent {
  branchForm: FormGroup<BranchOptions>;

  @Output()
  onCheckout = new EventEmitter<BranchOptions>();

  constructor() {
    const fb = new FormBuilder();

    this.branchForm = fb.group({
      name: ['']
    });
  }

  reset() {
    this.branchForm.reset();
  }

  checkout() {
    this.onCheckout.emit(this.branchForm.value);
    this.reset();
  }
}
