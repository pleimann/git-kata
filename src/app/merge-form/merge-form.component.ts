import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { MergeOptions } from '../git.config';

@Component({
  selector: 'app-merge-form',
  templateUrl: './merge-form.component.html',
  styleUrls: ['./merge-form.component.scss']
})
export class MergeFormComponent {
  @Input()
  branches: string[];

  @Input()
  currentBranch: string;

  mergeForm: FormGroup<MergeOptions>;

  @Output()
  onMerge = new EventEmitter<MergeOptions>();

  constructor() {
    const fb = new FormBuilder();

    this.mergeForm = fb.group({
      branch: ['']
    });
  }

  merge() {
    this.onMerge.emit(this.mergeForm.value);
  }
}
