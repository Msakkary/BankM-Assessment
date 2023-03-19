import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ConvertResponse,
  CurrenciesList,
  PopularResponse,
  Symbols,
  SymbolsResponse,
  SeriesRates,
  SeriesResponse,
  popularRates,
} from '../interfaces/fixer.type';
import { HttpService } from './http.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public popularCurrenciesSymbols = 'USD,EUR,JPY,AUD,CHF,CNY,CAD,HKD,GBP';
  public currenciesList!: CurrenciesList[];
  public USDEURRate!: number;

  constructor(private http: HttpService, private store: StoreService) {
    this.fetchAllCurr$();
  }

  public dateFormat(date: Date) {
    const [formattedDateWithoutTime] = date.toISOString().split('T');
    return formattedDateWithoutTime;
  }

  private fetchAllCurr$() {
    this.http.get<SymbolsResponse<Symbols>>('symbols').subscribe((response) => {
      this.currenciesList = Object.keys(response.symbols).map((s) => ({
        symbol: s,
        name: response.symbols[s],
      }));
    });
    this.initiateStickyPanel();
  }

  public initiateStickyPanel() {
    this.convert$(
      this.store.getState().from,
      this.store.getState().to,
      this.store.getState().amount
    ).subscribe((response) => {
      this.USDEURRate = 1 * response.info.rate;
    });
  }

  public convert$(from: string, to: string, amount: number) {
    return this.http.get<ConvertResponse>(
      `convert?to=${to}&from=${from}&amount=${amount}`
    );
  }

  public getPopularCurrenciesRates$(date: string, base: string) {
    return this.http.get<PopularResponse<popularRates>>(
      `${date}?symbols=${this.popularCurrenciesSymbols}&base=${base}`
    );
  }

  public rateSeries$(
    base: string,
    symbol: string,
    start_date: string,
    end_date: string
  ) {
    return this.http.get<SeriesResponse<SeriesRates>>(
      `timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbol}`
    );
  }
}
