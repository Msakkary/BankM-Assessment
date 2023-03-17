import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvertQuery } from '@app/@shared/interfaces/fixer.type';
import { StoreService } from '@app/@shared/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(private router: Router, private store: StoreService) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  detailsEU(){
    const queryEU: ConvertQuery = { amount: 1, from: 'EUR', to: 'USD' };
    this.store.updateState(queryEU)
  }
  detailsEG(){
    const queryEG: ConvertQuery = { amount: 1, from: 'EUR', to: 'GBP' };
    this.store.updateState(queryEG);
  }
}
