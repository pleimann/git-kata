import { InjectionToken } from '@angular/core';
import {
  GitgraphOptions,
  GitgraphBranchOptions,
  GitgraphCommitOptions,
  GitgraphMergeOptions,
  GitgraphTagOptions,
  BranchUserApi,
  Commit,
} from '@gitgraph/core';

type TNode = SVGElement;

export type GitOptions = GitgraphOptions;
export type CommitOptions = GitgraphCommitOptions<TNode>;
export type BranchOptions = GitgraphBranchOptions<TNode>;
export type MergeOptions = GitgraphMergeOptions<TNode>;
export type TagOptions = GitgraphTagOptions<TNode>;

export type BranchOperations = BranchUserApi<TNode>;
export type CommitInfo = Commit<TNode>;

export const GITGRAPH_OPTIONS = new InjectionToken<GitOptions>('GitgraphOptions', {
  providedIn: 'root',
  factory: () => ({})
});

export const DEFAULT_COMMIT_OPTIONS = new InjectionToken<CommitOptions>('GitgraphDefaultCommitOptions', {
  providedIn: 'root',
  factory: () => ({})
});