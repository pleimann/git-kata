import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommitOptions } from '@gitgraph/js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { CommitFormComponent } from './commit-form/commit-form.component';
import { GitGraphComponent } from './git-graph';
import { DEFAULT_COMMIT_OPTIONS, GITGRAPH_OPTIONS, GitOptions } from './git.config';
import { MergeFormComponent } from './merge-form/merge-form.component';
import { TagFormComponent } from './tag-form/tag-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GitGraphComponent,
    CommitFormComponent,
    BranchFormComponent,
    MergeFormComponent,
    TagFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    MatSelectModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    },
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

