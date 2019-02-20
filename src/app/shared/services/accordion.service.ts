// Core imports
import { Injectable } from '@angular/core';
// Model imports
import { Assessment } from '../../models/assessment-detail.model';

@Injectable()
export class AccordionService {
    private _breadcrumb: string;
    private _carousel: Assessment;
    public constructor() { }

    /**
     * This function is used to get the breadcrumb data
     */
    public getBreadcrumb(): string {
        if (this._breadcrumb) {
            return this._breadcrumb;
        } else if (sessionStorage.getItem('breadcrumb')) {
            return JSON.parse(sessionStorage.getItem('breadcrumb'));
        }
    }

    /**
     * This function is used to set the breadcrumb data
     * @param breadcrumb breadcrumb of assessment
     */
    public setBreadcrumb(breadcrumb: string): void {
        this._breadcrumb = breadcrumb;
        sessionStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
    }

    /**
     * This function is used to get the Carousel data
     * @param carouselAssessment assessment data of carousel
     */
    public setCarousel(carouselAssessment: Assessment): void {
        this._carousel = carouselAssessment;
    }

    /**
     * This function is used to get the carousel data
     */
    public getCarousel(): Assessment {
        return this._carousel;
    }
}
