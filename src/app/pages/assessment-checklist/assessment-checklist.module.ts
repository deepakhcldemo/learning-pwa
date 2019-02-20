import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentChecklistComponent } from './assessment-checklist.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [
  { path: '', component: AssessmentChecklistComponent },
  { path: '**', component: AssessmentChecklistComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssessmentChecklistComponent]

})
export class AssessmentChecklistModule { }
