import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterPanelComponent } from './converter-panel/converter-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [ConverterPanelComponent],
  exports: [ConverterPanelComponent],
})
export class SharedModule {}
