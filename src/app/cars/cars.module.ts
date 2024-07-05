import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddComponent } from './pages/add/add.component';
import { UpdateComponent } from './pages/update/update.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AddComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent,
    AddComponent,
    UpdateComponent
  ]
})
export class CarsModule { }
