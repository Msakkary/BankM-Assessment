import { Component, OnInit } from '@angular/core';
import { ConvertQuery, SeriesRates } from '@app/@shared/interfaces/fixer.type';
import { ApiService } from '@app/@shared/services/api.service';
import { StoreService } from '@app/@shared/services/store.service';
import { ChartDataset, ChartOptions, PointStyle } from 'chart.js';
import { skip } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  convertedData!: ConvertQuery;
  ChartData: ChartDataset[] = [];
  ChartLabels: string[] = [];
  ChartOptions: ChartOptions = {
    responsive: true,
    color: 'rgb(105, 2, 63)',
    backgroundColor: 'black',
    borderColor: 'rgb(105, 2, 63)',
  };

  baseCurr!: string;

  constructor(private api: ApiService, private store: StoreService) {}

  // Get Data from the store and initiate chart prepare process
  ngOnInit() {
    this.fetchRequiredData();
  }

  fetchRequiredData() {
    this.store.exchangeState$.pipe(skip(1)).subscribe((response) => {
      this.convertedData = response;
      this.prepareChartData(this.convertedData);
      this.baseCurr = response.from;
    });
  }

  // fetching time series in days as per API
  prepareChartData(data: ConvertQuery) {
    const yearAgo = this.api.dateFormat(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
    const today = this.api.dateFormat(new Date());
    this.api
      .rateSeries$(data.from, data.to, yearAgo, today)
      .subscribe((response) => {
        this.seriesInMonths(response.rates);
      });
  }

  // Transform the serios into monthly form for rendering
  seriesInMonths(rates: SeriesRates) {
    const monthlySeries: { [key: string]: {} } = {};
    for (const key in rates) {
      if (Object.prototype.hasOwnProperty.call(rates, key)) {
        const el = rates[key];
        const month = `${key.split('-')[0]}-${key.split('-')[1]}`;
        monthlySeries[month] = el;
      }
    }
    this.generateChart(monthlySeries);
  }

  //rendering the Chrats
  generateChart(data: SeriesRates) {
    this.ChartData = [
      {
        data: Object.values(data).map((r) => r[this.convertedData.to]),
        label: this.convertedData.to,
        pointBorderColor: 'black',
        pointBackgroundColor: 'black',
      },
    ];
    this.ChartLabels = Object.keys(data);
  }
}
