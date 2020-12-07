import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { CommitInfo, TagOptions } from '../git.config';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent {
  tagForm: FormGroup<TagOptions>;

  @Input()
  headCommit: CommitInfo;

  @Output()
  onTag = new EventEmitter<TagOptions>();

  constructor() {
    const fb = new FormBuilder();

    this.tagForm = fb.group({
      name: ['']
    });
  }

  reset() {
    this.tagForm.reset();
  }

  tag() {
    this.onTag.emit(this.tagForm.value);
    this.reset();
  }
}
