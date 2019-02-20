import { Injectable, OnDestroy } from '@angular/core';

// Rxjs objservable for create observable variable
import { Observable } from 'rxjs';

// Needed Model for type hinting
import { ProductDetails } from 'src/app/models/product-details';
import { ProgramHierarchies, Hierarchy } from 'src/app/models/program-hierarchies.model';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessProductHierarchyService implements OnDestroy {

  private productDetails: ProductDetails;

  constructor() { this.productDetails = new ProductDetails(); }

  /**
   * init product details
   * @name init
   * @param {Hierarchies as Object} productDetails as Hierarchies object to get all program
   * @param {number or string} productId as number or string for put and return particular product object
   * @returns {ProductDetails} ProductDetails as an observable
   */
  init(productDetails: ProgramHierarchies, productId: number|string): Observable<ProductDetails> {
    if (Object.keys(productDetails).length !== 0) {
      this.processProductHierarchyByProductId(productDetails as ProgramHierarchies, productId as string|number);
      return new Observable<ProductDetails>(observer => {
        try {
          observer.next(this.productDetails as ProductDetails);
          this.productDetails = null;
          this.productDetails = new ProductDetails;
          observer.complete();
        } catch (err) {
          observer.error(err);
        }
      });
    } else {
      LoggerService.error('Product details is empty', Error);
    }
  }

  /**
   * Process product details and creating program
   * @name processProductHierarchyByProductId
   * @param {Hierarchies as Object} productDetails as Hierarchies object to get all program
   * @param {number or string} productId as number or string for put and return particular product object
   * @void no return only update existing processObject
   */
  private processProductHierarchyByProductId(productDetails: ProgramHierarchies, productId: number|string ): void {
    try {
      this.productDetails.products['productId'] = productId;
      this.productDetails.products['programDetails'] = [];
      if (productDetails.hierarchies.length !== 0) {
        for (const productKey in productDetails.hierarchies) {
          if (productDetails.hierarchies[productKey].children.length > 0) {
            const productProgramIdentifier: string|number = `${productId}_${productDetails.hierarchies[productKey].identifier}`;
            this.appendDetailsInProductProgram(
              productKey as string,
              productDetails.hierarchies[productKey] as Hierarchy
            );
            this.appendDetailsInHierarchy(productProgramIdentifier as string|number);
            this.appendDetailsInProgramAssessment(productProgramIdentifier as string|number);
            this.getHierarchyDetailsFromProgramArray(
              productDetails.hierarchies[productKey].children as Hierarchy[],
              productKey as string
            );
          }
        }
      } else {
        LoggerService.error('Hierarchy details is empty in Product details', Error);
      }
    } catch (err) {
      LoggerService.error('Issue in process product hierarchy', err);
    }
  }

  /**
   * Appends program details in product program
   * @name appendDetailsInProductProgram
   * @param {string} programKey as string find current index in products object
   * @param {Hierarchy as Object} programDetail as Hierarchy Object for add program keys
   * @returns update product detail products with program key
   */
  private appendDetailsInProductProgram(programKey: string, programDetail: Hierarchy): void {
    try {
      if (programKey !== undefined && programKey !== null) {
        this.productDetails.products['programDetails'][programKey] = {
          identifier: programDetail.identifier,
          displayOrder: programDetail.displayOrder,
          titleInSequence: programDetail.titleInSequence,
          contentType: programDetail.contentType,
          mediaType: programDetail.mediaType,
          attachmentURL: programDetail.attachmentURL,
          version: programDetail.version
        };
      } else {
        LoggerService.error('Program key is empty', Error);
      }
    } catch (err) {
      LoggerService.error('Issue in append product details', err);
    }
  }

  /**
   * Appends hierarchy details in product program
   * @name appendDetailsInHierarchy
   * @param {number|string} productProgramIdentifier as number or string for program hierarchy mapping identifier key
   * @void no return type only update product details hierarchies
   */
  private appendDetailsInHierarchy(productProgramIdentifier: number|string): void {
    try {
      if (productProgramIdentifier) {
        const hierarchy: Object = {
          productProgramId: productProgramIdentifier,
          hierarchyDetails: []
        };
        this.productDetails.hierarchies.push(hierarchy);
      } else {
        LoggerService.error('Product program identifier is empty', Error);
      }
    } catch (err) {
      LoggerService.error('Error in append details in hierarchy', err);
    }
  }

  /**
   * Appends program assessment details
   * @name appendDetailsInProgramAssessment
   * @param {number or string } productProgramIdentifier as number or string for program assessment mapping identifier key
   * @void no return only update product details programAssessmentMapping
   */
  private appendDetailsInProgramAssessment(productProgramIdentifier: number|string): void {
    try {
      if (productProgramIdentifier) {
        const programAssessment: Object = {
          productProgramId: productProgramIdentifier,
          programAssessmentList: []
        };
        this.productDetails.programAssessmentMapping.push(programAssessment);
    } else {
      LoggerService.error('Product program identifier is empty', Error);
    }
    } catch (err) {
      LoggerService.error('Error in append details in program assessment mapping', err);
    }
  }

  /**
   * Gets hierarchy details from program array and creating hierarchy array
   * @name getHierarchyDetailsFromProgramArray
   * @param {Hierarchy as Array} hierarchies as Hierarchy of Array to get actual hierarchy
   * @param {string} programIndex as string for update programAssessment
   * @void no return only update existing hierarchyArray
   */
  private getHierarchyDetailsFromProgramArray(hierarchies: Hierarchy[], programIndex: string): void {
    try {
      for (const hierarchyKey in hierarchies) {
        if (hierarchies[hierarchyKey].hasOwnProperty('children') && hierarchies[hierarchyKey].children.length > 0) {
          this.productDetails.hierarchies[programIndex]['hierarchyDetails'].push(hierarchies[hierarchyKey]);
          this.checkHierarchyChildrenNodes(
            hierarchies[hierarchyKey].children as Hierarchy[],
            hierarchies[hierarchyKey].titleInSequence as string,
            hierarchies[hierarchyKey].identifier as string,
            programIndex as string
          );
        }
      }
    } catch (err) {
      LoggerService.error('Error in get hierarchy children', err);
    }

  }

  /**
   * Checks hierarchy children nodes and append path, parent keys in current node and delete node who does not have attachmentURL key
   * @name checkHierarchyChildrenNodes
   * @param {Hierarchy as Array} hierarchyNestedNodes as Hierarchy to get actual hierarchy
   * @param {string} path as string for append path in hierarchy nodes
   * @param {string} parent as string for append parent in hierarchy nodes
   * @param {string} programIndex as string for update programAssessment
   * @void no return only update existing hierarchyNestedNodes
   */
  private checkHierarchyChildrenNodes(hierarchyNestedNodes: Hierarchy[], path: string, parent: string,
    programIndex: string): void {
    try {
      for (const hierarchyNestedNodesKey in hierarchyNestedNodes) {
        if (hierarchyNestedNodes[hierarchyNestedNodesKey].hasOwnProperty('children') &&
          hierarchyNestedNodes[hierarchyNestedNodesKey].children.length > 0) {
          this.checkParentAndPathInNodes(
            hierarchyNestedNodes[hierarchyNestedNodesKey] as Hierarchy,
            path as string,
            parent as string
          );
          this.checkHierarchyChildrenNodes(
            hierarchyNestedNodes[hierarchyNestedNodesKey].children as Hierarchy[],
            hierarchyNestedNodes[hierarchyNestedNodesKey].path as string,
            hierarchyNestedNodes[hierarchyNestedNodesKey].parent as string,
            programIndex as string
          );
        } else if (hierarchyNestedNodes[hierarchyNestedNodesKey].hasOwnProperty('attachmentURL')
          && hierarchyNestedNodes[hierarchyNestedNodesKey].attachmentURL !== '') {
          this.checkParentAndPathInNodes(
            hierarchyNestedNodes[hierarchyNestedNodesKey] as Hierarchy,
            path as string,
            parent as string
          );
          this.setAssessment(
            hierarchyNestedNodes[hierarchyNestedNodesKey] as Hierarchy,
            programIndex as string
          );
        } else if (!hierarchyNestedNodes[hierarchyNestedNodesKey].hasOwnProperty('attachmentURL')) {
          delete hierarchyNestedNodes[hierarchyNestedNodesKey];
        } else if (hierarchyNestedNodes[hierarchyNestedNodesKey].hasOwnProperty('attachmentURL') &&
          hierarchyNestedNodes[hierarchyNestedNodesKey].attachmentURL === '') {
          delete hierarchyNestedNodes[hierarchyNestedNodesKey];
        }
      }
    } catch (err) {
      LoggerService.error('Error in check hierarchy children', err);
    }
  }

  /**
   * Checks parent and path in nodes if exists update path and parent otherwise add these keys
   * @name checkParentAndPathInNodes
   * @param {Hierarchy as Array} hierarchyNestedNodes as Hierarchy for check path and parent keys are exists or not
   * @param {string} path as string for append previous path
   * @param {string} parent as string for append previout parent
   * @void no return only update existing hierarchyNestedNodes
   */
  private checkParentAndPathInNodes(hierarchyNestedNodes: Hierarchy, path: string, parent: string): void {
    if (!hierarchyNestedNodes.hasOwnProperty('path') && !hierarchyNestedNodes.hasOwnProperty('parent')) {
      hierarchyNestedNodes['path'] = '';
      hierarchyNestedNodes['parent'] = '';
    }
    hierarchyNestedNodes['path'] += path + '|' + hierarchyNestedNodes.titleInSequence;
    hierarchyNestedNodes['parent'] += parent + '|' + hierarchyNestedNodes.identifier;
  }

  /**
   * Sets assessment details and append assessment url name via Set collections
   * @name setAssessment
   * @param {Hierarchy as Array} hierarchy as Hierarchy for get path, parent and attachmentUrl
   * @param {string} programIndex as string for update programAssessment
   * @void no return only update existing product details program assessment mapping
   */
  private setAssessment(hierarchy: Hierarchy, programIndex: string): void {
    try {
      if (hierarchy.path !== null && hierarchy.parent !== null && hierarchy.attachmentURL !== null) {
        const assessment: Object = {
          path: hierarchy.path,
          parent: hierarchy.parent,
          assessmentUrl: hierarchy.attachmentURL
        };
        this.productDetails.assessments.add(hierarchy.attachmentURL as string);
        this.productDetails.programAssessmentMapping[programIndex]['programAssessmentList'].push(assessment);
      } else {
        LoggerService.error('Hierarchy parent, path and attachmentUrl is empty ', Error);
      }
    } catch (err) {
      LoggerService.error('Issue in set assessment details' , err);
    }
  }

 /**
 * Destroy unwanted variables from memory
 * @name ngOnDestroy
 * @void no return type only destroy variables
 */
  ngOnDestroy() {
    this.productDetails = null;
  }
}
