import { Component, OnInit } from '@angular/core';
import { ConvertQuery } from '@app/@shared/interfaces/fixer.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  convertQuery!: ConvertQuery;

  constructor() {}

  updatePanel(data: ConvertQuery) {
    this.convertQuery = data;
  }
  ngOnInit() {
    this.isLoading = true;
  }
}
