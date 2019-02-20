import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SelectClassComponent } from './select-class.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  { path: '', component: SelectClassComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [SelectClassComponent],
  exports: [
  ]
})

export class SelectClassModule { }
