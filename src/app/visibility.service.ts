import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  constructor() { }

  private visibilitySubject = new BehaviorSubject<string>('profile');
  visibility$ = this.visibilitySubject.asObservable();

  setVisibility(component: string): void {
    this.visibilitySubject.next(component);
  }
}
