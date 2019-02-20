import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'pickclass', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pickclass', loadChildren: './pages/select-class/select-class.module#SelectClassModule' },
  { path: 'pages', redirectTo: 'pages' },
  { path: '**', redirectTo: 'pickclass' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
