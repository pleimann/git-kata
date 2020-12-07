import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { GitgraphUserApi, RenderedData, GitgraphCore } from '@gitgraph/core';
import { BranchOptions, CommitOptions, createGitgraph, MergeOptions, TagOptions } from '@gitgraph/js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BranchOperations, CommitInfo, DEFAULT_COMMIT_OPTIONS, GITGRAPH_OPTIONS, GitOptions } from '../git.config';

@Component({
  selector: 'app-git-graph',
  templateUrl: './git-graph.component.html',
  styleUrls: ['./git-graph.component.scss']
})
export class GitGraphComponent implements AfterViewInit {
  @ViewChild('gitgraph')
  private graphContainer!: ElementRef;

  private gitgraph!: GitgraphCore<SVGElement>;
  private gitgraphApi!: GitgraphUserApi<SVGElement>;
  private _headCommit$ = new BehaviorSubject<CommitInfo>(undefined);
  private _branchesMap$ = new BehaviorSubject<Map<string, BranchOperations>>(new Map<string, BranchOperations>());
  private _workingBranch$ = new BehaviorSubject<BranchOperations>(undefined);

  constructor(
    @Inject(GITGRAPH_OPTIONS) public graphOptions: GitOptions,
    @Inject(DEFAULT_COMMIT_OPTIONS) public defaultCommitOptions: CommitOptions,
  ) { }

  ngAfterViewInit(): void {
    this.gitgraphApi = createGitgraph(this.graphContainer.nativeElement, {
      // mode: Mode.Compact
    });

    this.gitgraphApi.clear();
    this.gitgraph = this.gitgraphApi['_graph'];

    this.gitgraph.subscribe(this.processUpdates.bind(this));

    this.branch({ name: 'master' });
    this.commit({ subject: 'Initial Commit' });
    this.commit({ subject: '2nd Commit' });

    this.branch({ name: 'newFeature' });
    this.commit({ subject: 'new feature commit' });

    this.tag({
      name: 'Shit!'
    });

    this.checkout('master');
    this.merge({
      branch: 'newFeature',
      commitOptions: {
        subject: 'Merge NewFeature'
      }
    });
  }

  /* BEGIN - Public API */
  get branches$(): Observable<string[]> {
    this.gitgraph.branches;
    return this._branchesMap$.pipe(map(branchesMap => [...branchesMap.keys()]));
  }

  get workingBranch$(): Observable<string> {
    return this._workingBranch$.asObservable().pipe(map(currentBranch => currentBranch.name));
  }

  get headCommit$(): Observable<CommitInfo> {
    return this._headCommit$.asObservable();
  }
  /* END - Public API */

  private get branchesMap(): Map<string, BranchOperations> {
    return this._branchesMap$.getValue();
  }

  private set branchesMap(map: Map<string, BranchOperations>) {
    this._branchesMap$.next(map);
  }

  private get workingBranch(): BranchOperations {
    return this._workingBranch$.getValue();
  }

  private set workingBranch(branch: BranchOperations) {
    this._workingBranch$.next(branch);
  }

  private get headCommit() {
    return this._headCommit$.getValue();
  }

  private set headCommit(commit: CommitInfo) {
    this._headCommit$.next(commit);
  }

  private processUpdates(data: RenderedData<SVGElement>): void {
    const newBranchesMap = [...data.branchesPaths.keys()].reduce((map, branch) =>
      map.set(branch.name, branch.getUserApi())
      , new Map<string, BranchOperations>());

    this.branchesMap = newBranchesMap;

    const lastCommit = data.commits.find(commit => commit.refs?.includes('HEAD'));

    this.headCommit = lastCommit;
  }

  commit(commit: CommitOptions) {
    this.workingBranch.commit({
      ...this.defaultCommitOptions,
      ...commit
    });
  }

  checkout(branchName: string): BranchOperations {
    return this.workingBranch = this.branchesMap.get(branchName);
  }

  branch(branchOptions: BranchOptions): BranchOperations {
    const branchOperations = this.gitgraphApi.branch(branchOptions.name);

    this.workingBranch = branchOperations;
    this.branchesMap.set(branchOptions.name, branchOperations);

    return branchOperations;
  }

  merge(mergeOptions: MergeOptions): BranchOperations {
    this.workingBranch = this.workingBranch.merge({
      ...mergeOptions,
      commitOptions: {
        ...this.defaultCommitOptions,
        ...mergeOptions.commitOptions
      },
    });

    return this.workingBranch;
  }

  tag(tagOptions: TagOptions) {
    this.gitgraphApi.tag(tagOptions);
  }
}
