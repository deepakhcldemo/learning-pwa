import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ContactInfoComponent } from './contact-info/contact-info.component';
import { StudentComponent } from './student.component';
import { StudentAssessmentComponent } from './student-assessment/student-assessment.component';
import { StudentMediaComponent } from './student-media/student-media.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';

import { StudentComponentService } from './student-component.service';
import { ContactInfoService } from './contact-info/contact-info.service';
import { CommentDalService } from 'src/app/shared/services/realtime-datalayer/comment-dal.service';
import { ObservationDalService } from 'src/app/shared/services/realtime-datalayer/observation-dal.service';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: '**', component: StudentComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule
  ],
  declarations: [StudentComponent, ContactInfoComponent,
    StudentAssessmentComponent, StudentMediaComponent, StudentNotesComponent],
  providers: [ContactInfoService, CommentDalService, ObservationDalService, StudentComponentService]
})
export class StudentModule { }
