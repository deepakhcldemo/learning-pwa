import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AssessmentChecklistComponent } from './components/assessment-checklist/assessment-checklist.component';
import { ObservationComponent } from './components/observation/observation.component';
import { ReportFilterComponent } from './components/report-filter/report-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ObservationChartComponent } from './components/observation-chart/observation-chart.component';
import { CommentComponent } from './components/comment/comment.component';
import { CalendarModule } from 'primeng/calendar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const routes: Routes = [
  { path: '', component: ReportComponent },
  { path: 'observation', component: ObservationComponent },
  { path: 'check-list', component: AssessmentChecklistComponent },
  { path: '**', component: ReportComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    PerfectScrollbarModule
  ],
  declarations: [ReportComponent, AssessmentChecklistComponent, ObservationComponent, ReportFilterComponent, ObservationChartComponent,
    CommentComponent]
})
export class ReportModule { }
