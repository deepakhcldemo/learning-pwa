import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { FilterOption, OptionSelected } from 'src/app/models/report.model';
import { ProgramClassModel } from 'src/app/models/program.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() { }
  private filterParameters = new BehaviorSubject<any>('');

  private onViewOptionsSelected = new Subject<any>();
  private onWhenOptionsSelected = new Subject<any>();
  private onSortByOptionsSelected = new Subject<any>();
  private currentProgram = new BehaviorSubject<any>(null);

  /**
   * Set current program
   * @param program current selected program
   */
  public setCurrentProgram(program: ProgramClassModel) {
    this.currentProgram.next(program);
  }

  /**
   * Get current program
   */
  public getCurrentProgram() {
    return this.currentProgram.asObservable();
  }
  /**
   * Set current date range.
   * @param dateRange updated date range value.
   */
  public setDateRange(dateRange: OptionSelected): void {
    this.filterParameters.next(dateRange);
  }

  /**
   * Get updated date range.
   */
  public getUpdatedDateRange(): Observable<OptionSelected> {
    return this.filterParameters.asObservable();
  }

  /**
   * Set view options selected
   * @param viewOptions view option
   */
  public setViewOptionsSelected(viewOptions: FilterOption): void {
    this.onViewOptionsSelected.next(viewOptions);
  }
  /**
   * Set "When" report filter.
   * @param whenOptions updated "When" value.
   */
  public setWhenOptionsSelected(whenOptions: FilterOption): void {
    this.onWhenOptionsSelected.next(whenOptions);
  }
  /**
   * Set "Sort By" report filter.
   * @param sortByOptions updated "Sort By" value.
   */
  public setSortByOptionsSelected(sortByOptions: FilterOption): void {
    this.onSortByOptionsSelected.next(sortByOptions);
  }

  /**
   * Get "view" report filter.
   */
  public getViewOptionsSelected(): Observable<FilterOption> {
    return this.onViewOptionsSelected.asObservable();
  }

  /**
   * Get "When" report filter.
   */
  public getWhenOptionsSelected(): Observable<FilterOption> {
    return this.onWhenOptionsSelected.asObservable();
  }
  /**
   * Get "Sort By" report filter.
   */
  public getSortByOptionsSelected(): Observable<FilterOption> {
    return this.onSortByOptionsSelected.asObservable();
  }

}
