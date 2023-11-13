import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDashboardRoutingModule } from './layout-dashboard-routing.module';
import { ToggleComponent } from './toggle/toggle.component';


@NgModule({
  declarations: [
    ToggleComponent
  ],
  imports: [
    CommonModule,LayoutDashboardRoutingModule
  ]
})
export class LayoutDashboardModule { }
