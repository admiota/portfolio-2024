import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { VisibilityService } from './visibility.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isChildVisible: boolean = false;
  arrVisibility:boolean[]=[true,false,false,false];
  toggleVisibility(number: number) {
    this.arrVisibility.forEach((value, index) => {
      if(index === number){
        this.arrVisibility[index] = true;
      }else{
        this.arrVisibility[index] = false;
      }
    });
    console.log(this.arrVisibility);
  }

  componentToShow = 'profile';
  ready = true;

  constructor(private el: ElementRef, private visibilityService: VisibilityService) {}

  scrollToComponent(componente: string, index:number): void {
    const element = this.el.nativeElement.querySelector(`#${componente}`);
    if (element) {
      this.ready = false;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      this.toggleVisibility(index)
    }
  }
  
  onAnimationEnd(): void {
    this.ready = true;
  }
}



/*public current: number = 0;
  @ViewChild('dynamicComponentTemplate', { read: ViewContainerRef })
  dynamicComponentTemplate!: ViewContainerRef;

  constructor(){
  }

  public ready: boolean = true;
  public fadeInClass: string = '';

  @ViewChildren('steps')
  public readonly steps!: QueryList<ElementRef>;

  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(args: WheelEvent) {

    args.preventDefault();

    if (args.deltaY > 20) {
      this.goToNextStep();
    }

    if (args.deltaY < 20) {
      this.goToPreviousStep();
    }
  }

  public goToNextStep(): void {
    if (this.current < this.steps.length - 1) {
      ++this.current;
      const targetStep = this.steps.find((_item, index) => index === this.current);
      this.goTo(targetStep);
    }
  }

  public goToPreviousStep(): void {
    if (this.current > 0) {
      --this.current;
      const targetStep = this.steps.find((_item, index) => index === this.current);
      this.goTo(targetStep);
    }
  }

  private goTo(target: any): void {
    this.ready = false;
    target.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  public getDynamicClass() {
    return this.ready ? 'trans-in' : 'trans-out';
  }*/