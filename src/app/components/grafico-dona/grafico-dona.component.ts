import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() public ChartData: any = [];
  @Input() public ChartType: any = '';
  @Input() public ChartLabels: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
