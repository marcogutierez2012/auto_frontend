import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './cars/pages/list/list.component';
import { HomePageComponent } from './cars/pages/home-page/home-page.component';
import { AddComponent } from './cars/pages/add/add.component';

const routes: Routes = [
  { path: '',
    component:HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
