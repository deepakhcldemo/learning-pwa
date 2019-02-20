// import { AccordionService } from './accordion.service';
// import { TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { async } from 'rxjs/internal/scheduler/async';

// describe('AccordionService', () => {
//     let accordionService: AccordionService;

//     beforeEach(()  => {

//         TestBed.configureTestingModule({

//             providers: [
//                 AccordionService,
//             ]
//         });
//     });

//     beforeEach(() => {
//         accordionService = TestBed.get(AccordionService);

//         accordionService.breadcrumb = 'Kindergarten > Unit 1 > Investigation 1 > Session 1.1';
//         accordionService.setBreadcrumb(accordionService.breadcrumb);

//         accordionService.carouselData = {
//             parent: '3|17|64|253',
//             title:  'MP8, Look for and express regularity in repeated reasoning',
//             type:   'checklist'
//         };

//         accordionService.setCarousel(accordionService.carouselData);
//     });

//     // Checking Class instance creation
//     it('Class "AccordionService" should be instanciated', () => {

//         expect(accordionService).toBeDefined();
//     });

//     // Checking the existence of method "breadcrumb" in class Class "AccordionService"
//     it('Method "breadcrumb" should be defined', () => {

//         expect(accordionService.breadcrumb).toBeDefined();
//     });

//      // Checking the existence of method "carouselData" in class Class "AccordionService"
//      it('Method "carouselData" should be defined', () => {

//         expect(accordionService.carouselData).toBeDefined();
//     });

//     // Checking the existence of method "getBreadcrum" in class Class "AccordionService"
//     it('Method "getBreadcrum" should be defined', () => {

//         const getBreadcrumValue =  accordionService.getBreadcrumb();

//         expect(accordionService.getBreadcrumb).toBeDefined();
//         expect(getBreadcrumValue).toBeDefined();
//         expect(getBreadcrumValue).toContain('Kindergarten > Unit 1 > Investigation 1 > Session 1.1');
//     });

//     // Checking the existence of method "setBreadcrum" in class Class "AccordionService"
//     it('Method "setCarousel" should be defined', () => {

//         expect(accordionService.setCarousel).toBeDefined();
//     });

//     // Checking the existence of method "getCarousel" in class Class "AccordionService"
//     it('Method "getCarousel" should be defined', () => {

//         expect(accordionService.getCarousel).toBeDefined();
//     });

//      // Checking the existence of method "setBreadcrum" in class Class "AccordionService"
//      it('Method "getCarousel" should be Called properly', () => {

//         const getCarouselValue =  accordionService.getCarousel();

//         expect(accordionService.getCarousel).toBeDefined();
//         expect(getCarouselValue).toBeDefined();
//         expect(getCarouselValue.parent).toContain('3|17|64|253');
//     });
// });
