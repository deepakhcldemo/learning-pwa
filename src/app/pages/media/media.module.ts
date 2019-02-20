// Core Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Imports
import { MediaComponent } from './media.component';
// Module Imports
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const routes: Routes = [
  { path: '', component: MediaComponent },
  { path: '**', component: MediaComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MediaComponent]
})
export class MediaModule {

}

