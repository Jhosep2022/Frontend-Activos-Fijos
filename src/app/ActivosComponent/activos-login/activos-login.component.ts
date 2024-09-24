import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-activos-login',
  templateUrl: './activos-login.component.html',
  styleUrls: ['./activos-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivosLoginComponent implements OnInit  {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }
}
