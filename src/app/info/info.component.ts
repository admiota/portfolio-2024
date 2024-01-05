import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('* => hidden', [
        animate('0.5s')
      ]),
      transition('* => visible', [
        animate('1s')
      ]),
    ])
  ],
})
export class InfoComponent implements OnInit {
  @Input() isVisible: any;
  componentVisibility: string = 'hidden';

  ngOnInit() {
    this.componentVisibility = 'hidden';
  }
  
  ngOnChanges() {
    this.toggleVisibility();
  }

  toggleVisibility() {
    this.componentVisibility = this.isVisible ? 'visible' : 'hidden';
  }

  constructor() {}

}
