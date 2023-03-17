import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { ConvertQuery, popularRates } from '@app/@shared/interfaces/fixer.type';

@Component({
  selector: 'app-currencies-grid',
  templateUrl: './currencies-grid.component.html',
  styleUrls: ['./currencies-grid.component.scss'],
})
export class CurrenciesGridComponent implements OnInit {
  resultRates!: popularRates;
  base!: string;
  amount!: number;

  @Input() set data(value: ConvertQuery) {
    if (value) {
      this.base = value.from;
      this.amount = value.amount;
      this.popularCurrenciesRates(this.base);
    }
  }

  constructor(private api: ApiService) {}

  ngOnInit() {}

  popularCurrenciesRates(baseSymbol: string) {
    this.api
      .getPopularCurrenciesRates$(this.api.dateFormat(new Date()), baseSymbol)
      .subscribe((response) => {
        this.resultRates = response.rates;
      });
  }
}
