import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvertQuery } from '@app/@shared/interfaces/fixer.type';
import { StoreService } from '@app/@shared/services/store.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {}
  urlData!: string;
  convertedData!: ConvertQuery;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params) {
        this.urlData = params;
      }
    });

    // will be used for the charts
    this.store.exchangeState$.subscribe((response) => {
      this.convertedData = response;
      console.log(this.convertedData);
    });
  }
}
