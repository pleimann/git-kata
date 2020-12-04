import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

import { InspectorModule } from '@ngneat/inspector';
import { CommitOptions } from '@gitgraph/js';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitGraphComponent } from './git-graph';
import { DEFAULT_COMMIT_OPTIONS, GITGRAPH_OPTIONS, GitOptions } from './git.config';
import { CommitFormComponent } from './commit-form/commit-form.component';
import { BranchFormComponent } from './branch-form/branch-form.component';


@NgModule({
  declarations: [
    AppComponent,
    GitGraphComponent,
    CommitFormComponent,
    BranchFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    environment.production ? [] : InspectorModule.forRoot(),
    FlexLayoutModule,
    LayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [
    { provide: GITGRAPH_OPTIONS, useValue: <GitOptions>{} },
    {
      provide: DEFAULT_COMMIT_OPTIONS, useValue: <CommitOptions>{
        author: 'Mike Pleimann <mike.pleimann@wwt.com>',
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
