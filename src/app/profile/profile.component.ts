import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { TypeWriterService } from '../services/typeWriter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    /*trigger('fadeInAnimation', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ]),
    ]),
    trigger('shadowAnimation', [
      state('visible', style({
        background:'blue'
        // filter: 'drop-shadow(0 0mm 5mm rgba(0, 0, 0, 0.453))',
        // background:'blue'
      })),
      state('hidden', style({
        background:'red'
        // filter: 'drop-shadow(0 0mm 0mm rgba(0, 0, 0, 0.453))',
        // background:'yellow'
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ]),
    ]),*/
    trigger( 'fadeInAnimation', [
      state( 'visible', style( {
        opacity: 1,
        //background:'red'
      } ) ),
      state( 'hidden', style( {
        opacity: 0,
        //background:'blue'
      } ) ),
      transition( '* <=> *', [
        group([
          query('@shadowAnimation', animateChild(), { optional: true }),
          animate('1s'),
        ]),
        group([
          query('@zoomAnimation', animateChild(), { optional: true }),
          animate('1s'),
        ]),
      ] ),
    ]),
    trigger( 'shadowAnimation', [
      state( 'visible', style( {
        filter: 'drop-shadow(18px -16px 19px #121212)',
      } ) ),
      state( 'hidden', style( {
        filter: 'drop-shadow(0 0mm 0mm rgba(0, 0, 0, 0))',
      } ) ),
      transition( '* <=> *', [
        animate('3s'),
      ] ),
    ]),
    trigger( 'zoomAnimation', [
      state( 'on', style( {
        width: '60%'
      } ) ),
      state( '*', style( {
        width: '50%',
      } ) ),
      transition( '* <=> *', [
        animate('3s'),
      ] ),
    ]),
    
  ],
})


export class ProfileComponent implements OnInit {
  loadProfile:string = 'off';
  @Input() isVisible: any;
  componentVisibility: string = 'hidden';
  typedTexts$ = this.typewriterService.text$;

  constructor(private typewriterService: TypeWriterService, private renderer: Renderer2) {}

  ngOnInit() {
    this.loadProfile='on';
    this.componentVisibility='hidden';
    this.toggleVisibility();
    const texts = ['Frontend Developer', 'Programming passionated', 'Fanatic about efficiency', 'Interface Design Lover','Continuous Learner'];

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

