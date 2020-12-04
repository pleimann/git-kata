import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GitgraphUserApi, BranchUserApi, Mode } from '@gitgraph/core';
import { BranchOptions, CommitOptions, createGitgraph, MergeOptions, TagOptions } from '@gitgraph/js';
import { BehaviorSubject } from 'rxjs';
import { BranchOperations, DEFAULT_COMMIT_OPTIONS, GITGRAPH_OPTIONS, GitOptions } from '../git.config';

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements AfterViewInit {
  @ViewChild('gitgraph')
  private graphContainer!: ElementRef;

  private gitgraph!: GitgraphUserApi<SVGElement>;
  private branches = new Map<string, BranchOperations>();
  private _currentBranch$ = new BehaviorSubject<BranchOperations>(undefined);

  constructor(
    @Inject(GITGRAPH_OPTIONS) public graphOptions: GitOptions,
    @Inject(DEFAULT_COMMIT_OPTIONS) public defaultCommitOptions: CommitOptions,
  ) { }

  get currentBranch$() {
    return this._currentBranch$.asObservable();
  }

  private get currentBranch() {
    return this._currentBranch$.getValue();
  }

  private set currentBranch(branch: BranchOperations) {
    this._currentBranch$.next(branch);
  }

  ngAfterViewInit(): void {
    this.gitgraph = createGitgraph(this.graphContainer.nativeElement, {
      // mode: Mode.Compact
    });

    this.branch({ name: 'master' });
    this.commit({ subject: 'Initial Commit' }, 'master');
    this.commit({ subject: '2nd Commit' });

    this.branch({ name: 'newFeature' });
    this.commit({ subject: 'new feature commit' });

    // this.checkout('master');
    this.merge('newFeature', 'NewFeature Merge', 'master');
  }

  commit(commit: CommitOptions, branchName?: string) {
    if (!!branchName) {
      this.checkout(branchName);
    }

    this.currentBranch.commit({
      ...this.defaultCommitOptions,
      ...commit
    });
  }

  checkout(branchName: string): BranchOperations {
    return this.currentBranch = this.branches.get(branchName);
  }

  branch(branchOptions: BranchOptions): BranchOperations {
    const branchOperations = this.gitgraph.branch(branchOptions.name);

    this.currentBranch = branchOperations;
    this.branches.set(branchOptions.name, branchOperations);

    return branchOperations;
  }

  merge(sourceBranch: string, subject?: string, destinationBranch?: string): BranchOperations {
    const mergeBranch = this.branches.get(sourceBranch);

    if (!!destinationBranch) {
      this.checkout(destinationBranch);
    }

    if (this.currentBranch === mergeBranch) {
      console.warn("Can't merge branch to itself. Checkout the destination branch first.");
    } else {
      this.currentBranch = this.currentBranch.merge(mergeBranch, subject);
    }

    return this.currentBranch;
  }

  tag(tagOptions: TagOptions) {
    this.gitgraph.tag(tagOptions);
  }
}
