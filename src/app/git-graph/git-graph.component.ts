import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GitgraphUserApi, BranchUserApi, Mode } from '@gitgraph/core';
import { BranchOptions, CommitOptions, createGitgraph, MergeOptions, TagOptions } from '@gitgraph/js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private _branchesMap$ = new BehaviorSubject<Map<string, BranchOperations>>(new Map<string, BranchOperations>());
  private _currentBranch$ = new BehaviorSubject<BranchOperations>(undefined);

  constructor(
    @Inject(GITGRAPH_OPTIONS) public graphOptions: GitOptions,
    @Inject(DEFAULT_COMMIT_OPTIONS) public defaultCommitOptions: CommitOptions,
  ) { }

  /* BEGIN - Public API */
  get branches$(): Observable<string[]> {
    return this._branchesMap$.pipe(map(branchesMap => [...branchesMap.keys()]));
  }

  get currentBranch$(): Observable<string> {
    return this._currentBranch$.asObservable().pipe(map(currentBranch => currentBranch.name));
  }
  /* END - Public API */

  private get branchesMap(): Map<string, BranchOperations> {
    return this._branchesMap$.getValue();
  }

  private set branchesMap(map: Map<string, BranchOperations>) {
    this._branchesMap$.next(map);
  }

  private get currentBranch(): BranchOperations {
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

    this.checkout('master');
    this.merge({
      branch: 'newFeature',
      commitOptions: {
        subject: 'NewFeature Merge'
      }
    });
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
    return this.currentBranch = this.branchesMap.get(branchName);
  }

  branch(branchOptions: BranchOptions): BranchOperations {
    const branchOperations = this.gitgraph.branch(branchOptions.name);

    this.currentBranch = branchOperations;
    this.branchesMap.set(branchOptions.name, branchOperations);

    return branchOperations;
  }

  merge(mergeOptions: MergeOptions): BranchOperations {
    if (this.currentBranch === mergeOptions.branch) {
      console.warn(`You're already on the ${mergeOptions.branch} branch. Checkout the destination branch first.`);

    } else {
      this.currentBranch = this.currentBranch.merge({
        ...mergeOptions,
        commitOptions: {
          ...this.defaultCommitOptions,
          ...mergeOptions.commitOptions
        },
      });
    }

    return this.currentBranch;
  }

  tag(tagOptions: TagOptions) {
    this.gitgraph.tag(tagOptions);
  }
}
