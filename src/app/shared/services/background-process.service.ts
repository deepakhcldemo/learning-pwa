import { Injectable, NgZone, OnDestroy } from '@angular/core';
// Subscription service for unsubscribe
import { Subscription } from 'rxjs';

// Get Http or Graphql constant
import { environment } from 'src/environments/environment';

// Needed Services to get and process our product and program details
import { GetProductDetailsFromApiService } from './get-product-details-from-api.service';
import { ProcessProductHierarchyService } from './process-product-hierarchy.service';

// Needed Services to insert details into Cache
import { ProgramDalService } from './cache-datalayer/program-dal.service';
import { HierarchyDalService } from './cache-datalayer/hierarchy-dal.service';
import { AssessmentDalService } from './cache-datalayer/assessment-dal.service';

// Needed Services to set product ids
import { ProductService } from './product.service';

// Needed Model for type hinting
import { ProgramHierarchies } from 'src/app/models/program-hierarchies.model';
import { ProductDetails } from 'src/app/models/product-details';

// Needed Logger service for log error
import { LoggerService } from '../logger.service';
import { Assessment } from 'src/app/models/assessment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundProcessService implements OnDestroy {

  private httpSubscription: Subscription;
  private processSubscription: Subscription;

  constructor(
    private _ngZone: NgZone,
    private productDetailsFromApiService: GetProductDetailsFromApiService,
    private processProductHierarchyService: ProcessProductHierarchyService,
    private programDalService: ProgramDalService,
    private hierarchyDalService: HierarchyDalService,
    private assessmentDalService: AssessmentDalService,
    private productService: ProductService
  ) { }

  /**
 * Process product details indise ngzone to get actual program, navigation and assessment details
 * @name runBackgroundProcessViaNgzone
 * @param {Array of Object} {productIds} product ids as an array of number to fetch all products details
 * @param {string} {castgc} castgc as a string for authenticate valid user
 * @param {string} {variant} variant as a string for mapping existing user variant
 * @void no return type only call another service
 */
  init(productIds: Array<number | string>, castgc?: string, variant?: string): void {
    this._ngZone.runOutsideAngular(() => {
      this.getProductDetailsFromApis(productIds as Array<Number | String>);
    });
  }

  /**
 * fetch details from http or graphql service and processing this details
 * @name getProductDetailsFromApis
 * @param {Array of Number or String} {productIds} product ids as an array of number to fetch all products details
 * @void no return type only get process details and insert into Cache
 */
  private getProductDetailsFromApis(productIds: Array<Number | String>): void {
    if (Array.isArray(productIds) && productIds.length !== 0) {
      productIds.forEach((id: number|string) => {
        const url: String = `${environment.mockProductDataUrl}${id}.json`;
        this.httpSubscription = this.productDetailsFromApiService.getProgramDetailsFromHttpService(url as string).subscribe(
          (products: Object) => {
            this.processProductDetails(products['data'] as ProgramHierarchies, id as number|string);
          },
          (error: Object) => LoggerService.error(error['message'] as string, error as Object)
        );
      });
    }
  }

  /**
   * Process product details get assessment and hierarchy details
   * @name processProductDetails
   * @param {Hierarchies as Object} productDetails as Hierarchies object to get all program
   * @param {number or string} productId as number or string for put and return particular product object
   * @void no return type only call service and insert details into Cache
   */
  private processProductDetails(products: ProgramHierarchies, productId: number|string): void {
    this.processSubscription = this.processProductHierarchyService.init(
      products as ProgramHierarchies, productId as number | string).subscribe(
      {
        next: (productDetails: ProductDetails) => {
          this.insertIntoCache(productDetails as ProductDetails);
          this.loadAssessmentUrls(productDetails.assessments as Set<string>);
        },
        complete: () => {
          this.productService.setProcessProductIds(productId);
        },
        error: (error: Object) => {
          LoggerService.error(error['message'] as string, error as Object);
        }
    });
  }

  /**
   * fetch assessment details from http service and insert into Cache
   * @name loadAssessmentUrls
   * @param {Set of Object} {assessmentUrls} assessment urls set as object of string to fetch all assessment details from particular url
   * @void no return type only call service and insert details into Cache
   */
  private loadAssessmentUrls(assessmentUrls: Set<string>): void {
    if (assessmentUrls.size > 0) {
      assessmentUrls.forEach((assessmentValue) => {
        const url: String = `${environment.mockAssessmentDataUrl}${assessmentValue}`;
        const assessmentKey = assessmentValue;
        this.httpSubscription = this.productDetailsFromApiService.getProgramDetailsFromHttpService(
          url as string).subscribe((assessment: Assessment) => {
            assessment['assessmentPath'] = assessmentKey;
            this.assessmentDalService.insertAssessmentIntoCache(assessment as Assessment);
          },
            (error: Object) => LoggerService.error(error['message'] as string, error as Object)
          );
      });
    } else {
      LoggerService.error('assessmentUrls is empty', Error);
    }
  }

  /**
 * Insert program, hierarchy and programAssessment details into Cache
 * @name insertIntoCache
 * @param {Array of Object} {productDetails} product details as an array of object have multiple object (products,
 * hierarchies, programAssessmentMapping) to insert into Cache
 * @void no return type only call service and insert details into Cache
 */
  private insertIntoCache(productDetails: ProductDetails): void {
    if (Object.keys(productDetails.products).length !== 0
      && productDetails.hierarchies.length !== 0 &&
      productDetails.programAssessmentMapping.length !== 0) {
      this.programDalService.insertIntoCache(productDetails.products);
      this.insertHierarchyIntoCache(productDetails.hierarchies);
      this.insertProgramAssessmentMappingIntoCache(productDetails.programAssessmentMapping);
    } else {
      LoggerService.error('Product Details is empty', Error);
    }
  }

  /**
 * Insert hierarchy details into Cache
 * @name insertHierarchyIntoCache
 * @param {Array of Object} {hierarchies} hierarchy as array of object have hierarchy object to insert into Cache
 * @void no return type only call service and insert details into Cache
 */
  private insertHierarchyIntoCache(hierarchies: Array<Object>): void {
    if (Array.isArray(hierarchies) && hierarchies.length !== 0) {
      hierarchies.forEach((hierarchydetails) => {
        this.hierarchyDalService.insertIntoCache(hierarchydetails);
      });
    } else {
      LoggerService.error('Hierarchies is empty', Error);
    }
  }

  /**
 * Insert programAssessment details into Cache
 * @name insertProgramAssessmentMappingIntoCache
 * @param {Array of Object} {programAssessments} program Assessment as an array of object have program
 * assessment object to insert into Cache
 * @void no return type only call service and insert details into Cache
 */
  private insertProgramAssessmentMappingIntoCache(programAssessments: Array<Object>): void {
    if (Array.isArray(programAssessments) && programAssessments.length !== 0) {
      programAssessments.forEach((programAssessmentDetails) => {
        this.assessmentDalService.insertAssessmentMapIntoCache(programAssessmentDetails);
      });
    } else {
      LoggerService.error('Program Assessment is empty', Error);
    }
  }

  /**
   * Destroy unwanted variables from memory
   * @name ngOnDestroy
   * @void no return type only destroy variables
   */
  ngOnDestroy(): void {
    this._ngZone = null;
    this.productDetailsFromApiService = null;
    this.processProductHierarchyService = null;
    this.programDalService = null;
    this.hierarchyDalService = null;
    this.assessmentDalService = null;
    this.httpSubscription.unsubscribe();
    this.processSubscription.unsubscribe();
  }

}
