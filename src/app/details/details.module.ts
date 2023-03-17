import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { ChartComponent } from './chart/chart.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, DetailsRoutingModule, SharedModule],
  declarations: [DetailsComponent, ChartComponent],
  exports: [ChartComponent],
})
export class DetailsModule {}
