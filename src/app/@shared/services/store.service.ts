import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConvertQuery } from '../interfaces/fixer.type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialQuery: ConvertQuery = { amount: 1, from: 'EUR', to: 'USD' };

  private exchangeState = new BehaviorSubject<ConvertQuery>(this.initialQuery);
  exchangeState$ = this.exchangeState.asObservable();

  constructor() {}

  public updateState(q: ConvertQuery) {
    this.exchangeState.next(q);
  }

  public getState() {
    return this.exchangeState.value;
  }
}
