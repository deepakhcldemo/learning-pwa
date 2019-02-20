import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private _mostRecent: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor() { }

  /**
   * function for setting recent carousel item flag
   */
  setCurrentSlideShowFlag(flag: boolean): void {
    this._mostRecent.next(flag);
  }

  /**
   * function for getting recent carousel item flag
   */
  getCurrentSlideShowFlag(): Observable<boolean> {
    return this._mostRecent.asObservable();
  }
}
