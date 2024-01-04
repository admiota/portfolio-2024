import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public current: number = 0;
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
    this.ready=false;
    args.preventDefault();

    if (args.deltaY > 100) {
      this.goToNextStep();
    }

    if (args.deltaY < 100) {
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
      this.ready = true;
  }

  public getDynamicClass() {
    return this.ready ? 'trans-in' : 'trans-out';
  }
  
}