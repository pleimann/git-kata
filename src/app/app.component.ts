import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GitGraphComponent } from './git-graph/git-graph.component';
import { BranchOptions, CommitOptions, MergeOptions } from './git.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(GitGraphComponent)
  gitComponent: GitGraphComponent | undefined;

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

  public merge(options: MergeOptions) {
    this.gitComponent?.merge(options)
  }
}
