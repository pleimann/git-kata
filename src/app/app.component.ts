import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { CommitFormComponent } from './commit-form/commit-form.component';
import { GitGraphComponent } from './git-graph/git-graph.component';
import { BranchOptions, CommitOptions } from './git.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(GitGraphComponent)
  private gitComponent: GitGraphComponent | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  public commit(commit: CommitOptions) {
    this.gitComponent?.commit(commit);
  }

  public branch(branch: BranchOptions) {
    this.gitComponent?.branch(branch);
  }
}
