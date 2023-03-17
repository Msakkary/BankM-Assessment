import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { UntilDestroy } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
