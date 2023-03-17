export interface SymbolsResponse<T> {
    success: boolean;
    symbols: T;
  }
  
  export interface Symbols {
    [name: string]: string;
  }
  
  export interface CurrenciesList {
    symbol: string;
    name: string;
  }
  
  export interface ConvertResponse {
    date: Date;
    info: ConvertInfo;
    query: ConvertQuery;
    result: number;
    success: boolean;
  }
  
  export interface ConvertInfo {
    rate: number;
    timestamp: number;
  }
  
  export interface ConvertQuery {
    amount: number;
    from: string;
    to: string;
  }
  
  export interface PopularResponse<T> {
    base: string;
    date: string;
    historical: boolean;
    rates: T;
    success: true;
    timestamp: number;
  }
  
  export interface popularRates {
    [name: string]: number;
  }
  
  export interface SeriesResponse<T> {
    base: string;
    end_date: string;
    rates: T;
    start_date: string;
    success: boolean;
    timeseries: boolean;
  }
  
  export interface SeriesRates {
    [name: string]: SeriesRate;
  }
  
  export interface SeriesRate {
    [name: string]: number;
  }
  