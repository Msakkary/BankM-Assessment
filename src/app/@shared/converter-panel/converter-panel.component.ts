import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { ConvertQuery } from '../interfaces/fixer.type';
import { StoreService } from '../services/store.service';
import { debounce, interval, skip } from 'rxjs';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss'],
})
export class ConverterPanelComponent implements OnInit {
  //Interfaces
  convertForm!: FormGroup;
  convertQuery!: ConvertQuery;

  // Rendering Variables
  rate!: number;
  result!: number;
  targetedCurr!: string;
  baseCurr!: string;
  detailCurr!: string;

  // Details Page Trigger
  isDetailsPage!: boolean;

  // Communication
  @Output() converted: EventEmitter<ConvertQuery> = new EventEmitter();

  constructor(
    private router: Router,
    public api: ApiService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkParam();
    this.store.exchangeState$.pipe().subscribe((response) => {
      this.convertQuery = response;
    });
  }

  // init the form and add the validators
  initForm() {
    this.convertForm = new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^(0|[1-9][0-9]*)$'),
      ]),
    });
  }

  // Update the emitter and the state management
  updateStore() {
    this.store.updateState(this.convertQuery);
    this.converted.emit({
      from: this.convertForm.value.from,
      to: this.convertForm.value.to,
      amount: this.convertForm.value.amount,
    });
  }

  // Send form data to the server and assign response to rendering variables
  convert() {
    this.api
      .convert$(
        this.convertForm.value.from,
        this.convertForm.value.to,
        this.convertForm.value.amount
      )
      .pipe(debounce(() => interval(1500)))
      .subscribe((response) => {
        this.convertQuery = this.convertForm.value;
        this.rate = response.info.rate;
        this.baseCurr = response.query.from;
        this.targetedCurr = response.query.to;
        this.result = this.convertForm.value.amount * this.rate;
        this.updateStore();
      });
  }

  // Swapping from & to
  swapSelection() {
    this.convertForm.patchValue({
      from: this.convertForm.get('to')?.value,
      to: this.convertForm.get('from')?.value,
    });
  }

  // Navigating to details page and adding the currancy to the URL
  routeToDetail() {
    this.router.navigate(['/details'], {
      queryParams: {
        curr: this.api.currenciesList.find(
          (s) => s.symbol === this.convertForm.value.from
        )?.name,
      },
    });
  }

  //check if we have query param, to handle details page logic
  checkParam() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params) {
        this.detailCurr = params.curr;
      }
    });
    if (this.detailCurr) {
      this.isDetailsPage = true;
      this.convertForm.patchValue({
        from: this.store.getState().from,
        to: this.store.getState().to,
        amount: this.store.getState().amount,
      });
      this.convert();
    } else {
      this.isDetailsPage = false;
      this.baseCurr = this.store.getState().from;
      this.targetedCurr = this.store.getState().to;
    }
  }
}
