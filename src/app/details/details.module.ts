import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, DetailsRoutingModule, SharedModule, NgChartsModule],
  declarations: [DetailsComponent, ChartComponent],
  exports: [ChartComponent],
})
export class DetailsModule {}
