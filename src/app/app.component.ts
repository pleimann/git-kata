import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { createGitgraph } from '@gitgraph/js';
import { GitgraphUserApi } from '@gitgraph/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('gitgraph')
  private graphContainer!: ElementRef;

  private gitgraph!: GitgraphUserApi<SVGElement>;

  constructor() { }

  ngAfterViewInit(): void {
    this.gitgraph = createGitgraph(this.graphContainer.nativeElement);

    const master = this.gitgraph.branch("master");
    master.commit("Init the project");
    master
      .commit("Add README")
      .commit("Add tests")
      .commit("Implement feature");
    master.tag("v1.0");

    const newFeature = this.gitgraph.branch("new-feature");
    newFeature.commit("Implement an awesome feature");
    master.commit("Hotfix a bug");
    newFeature.commit("Fix tests");

    // Merge `newFeature` into `master`
    master.merge(newFeature, "Release new version");
  }
}
