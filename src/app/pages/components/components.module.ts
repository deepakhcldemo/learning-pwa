import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { OngoingStudentDetailComponent } from './ongoing-student-details/ongoing-student-detail.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StudentDetailService } from './student-detail/student-detail.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],

  exports: [
    StudentDetailComponent,
    OngoingStudentDetailComponent],
  declarations: [
    StudentDetailComponent,
    OngoingStudentDetailComponent],
  providers: [StudentDetailService]
})
export class ComponentsModule { }
