import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TypeWriterService } from '../services/typeWriter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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


export class ProfileComponent implements OnInit {
  @Input() isVisible: any;
  componentVisibility: string = 'visible';
  typedTexts$ = this.typewriterService.text$;

  constructor(private typewriterService: TypeWriterService) {}

  ngOnInit() {
    this.componentVisibility = 'visible';
    
    const texts = ['Hola', 'Adiós', 'Otro texto'];
    const speed = 100;
    this.typewriterService.onTypeText(texts, speed);
  }
  
  ngOnChanges() {
    this.toggleVisibility();
  }

  toggleVisibility() {
    this.componentVisibility = this.isVisible ? 'visible' : 'hidden';
  }


}

