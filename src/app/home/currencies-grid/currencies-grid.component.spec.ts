/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CurrenciesGridComponent } from './currencies-grid.component';

describe('CurrenciesGridComponent', () => {
  let component: CurrenciesGridComponent;
  let fixture: ComponentFixture<CurrenciesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
