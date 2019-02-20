import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingAssessmentComponent } from './ongoing-assessment.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [
  { path: '', component: OngoingAssessmentComponent },
  { path: '**', component: OngoingAssessmentComponent }
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
  declarations: [OngoingAssessmentComponent]

})
export class OngoingAssessmentModule { }
