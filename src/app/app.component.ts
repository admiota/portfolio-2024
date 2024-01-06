import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  current: number = 0;
  isChildVisible: boolean = false;
  arrVisibility:boolean[]=[true,false,false,false];


  @ViewChildren('navbarButtons') navbarButtons!: QueryList<ElementRef>;

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
    if (this.current < this.arrVisibility.length - 1) {
      ++this.current;
      this.goTo(this.current);
    }
  }

  public goToPreviousStep(): void {
    if (this.current > 0) {
      --this.current;
      this.goTo(this.current);
    }
  }

  private goTo(index: number): void {
    this.ready = false;
    const buttonsArray = this.navbarButtons.toArray();
    
    if (index < buttonsArray[0].nativeElement.childNodes.length) {
      buttonsArray[0].nativeElement.childNodes[index].click();
    }
  }
  
  toggleVisibility(number: number) {
    this.arrVisibility.forEach((value, index) => {
      if(index === number){
        this.arrVisibility[index] = true;
      }else{
        this.arrVisibility[index] = false;
      }
    });
  }

  componentToShow = 'profile';
  ready = true;

  constructor(private el: ElementRef) {}

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