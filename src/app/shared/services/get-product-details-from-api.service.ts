import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs Library's
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Graphql query service
import { GraphqlService } from 'src/app/graphql/graphql.service';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class GetProductDetailsFromApiService {

  constructor(private httpService: HttpClient, private graphqlService: GraphqlService) { }

  /**
 * Get data from Graphql server
 * @name getProgramDataFromGraphqlService
 * @param {Array of Number} {ids} ids as an array to fetch all product data
 * @returns {Array of Object} return product data as an array of object
 */
  getProgramDetailsFromGraphqlService(ids: Array<Number>): Observable<Array<Object>> {
    return this.graphqlService.watch({ ids: ids }).valueChanges.pipe((map(({ data }) => data['data'])));
  }

  /**
 * Get data from apis
 * @name getProgramDataFromHttpService
 * @param {string} {url} url as a string to fetch data from endpoints
 * @returns {Object} return product data as a object
 */
  getProgramDetailsFromHttpService(url: string): Observable<Object> {
    try {
      if (url) {
        return this.httpService.get(url as string).pipe(
          map((dataFromApi) => dataFromApi),
          catchError((err) => throwError('Issue In API Call: ' + err.json().error))
        );
      } else {
        LoggerService.error('Url is empty in get program detail from http service', Error);
      }
    } catch (err) {
      LoggerService.error('Issue in fetching product details', err);
    }
  }

  // NOTE: Currently this function is not used. In future we will be use.
  /**
 * Get product ids from product data
 * @name getProductIdsFromProductData
 * @param {Array of Object} {productData} product data as an array of object to fetch product ids
 * @returns {Array of Number} return product ids as an array of number
 */
  private getProductIdsFromProductData(productData: Array<Object>): Observable<Array<Number>> {
    const ids: Array<number> = [];
    for (const productD in productData) {
      if (productData[productD].hasOwnProperty('ProductId')) {
        ids.push(productData[productD]['ProductId']);
      }
    }
    return of(ids as Number[]);
  }
}
