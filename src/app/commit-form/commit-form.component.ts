import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { CommitOptions, DEFAULT_COMMIT_OPTIONS } from '../git.config';

@Component({
  selector: 'app-commit-form',
  templateUrl: './commit-form.component.html',
  styleUrls: ['./commit-form.component.scss']
})
export class CommitFormComponent {
  commitForm: FormGroup<CommitOptions>;

  @Output()
  onCommit = new EventEmitter<CommitOptions>();

  constructor(@Inject(DEFAULT_COMMIT_OPTIONS) public defaultCommitOptions: CommitOptions) {
    const fb = new FormBuilder();

    this.commitForm = fb.group({
      author: [defaultCommitOptions.author],
      subject: [defaultCommitOptions.subject],
    });
  }

  reset() {
    this.commitForm.reset(this.defaultCommitOptions);
  }

  commit() {
    this.onCommit.emit(this.commitForm.value);
    this.reset();
  }
}
