import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/assessment-detail.model';
import { IndexedDbService } from './indexed.db.service';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { AuthorizedProduct } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productIds: BehaviorSubject<string|number> = new BehaviorSubject<string|number>(0);
  private _authorizedProductIds: Array<string> = [];
  private _cProduct: Product;
  private _currentProduct: Subject<Product> = new Subject();
  private currentProductId: string;
  private _productCarousel: Subject<any> = new Subject();
  constructor(private IDBService: IndexedDbService) { }

  /**
   * Set product ids while processed in background
   * @param productId
   */
  setProcessProductIds(productId: string|number): void {
    this._productIds.next(productId);
  }

  /**
   * Get product ids while processed in background
   * @name getProcessProductIds
   */
  getProcessProductIds() {
    return this._productIds.asObservable();
  }

  /**
     * For Mapping The Product.
     * @param permissons
     */
  getProductWithISBN(permissions) {
    const filteredPermissons = permissions.filter((permission) => {
      if (environment.productId.indexOf(permission.ProductId) >= 0) {
        return { ProductId: permission.ProductId, OrderedISBN: permission.OrderedISBN };
      }
    });
    const productISBN = filteredPermissons.map((permission) => {
      return { ProductId: permission.ProductId, OrderedISBN: permission.OrderedISBN };
    });
    return productISBN.filter((value, index, productISBNList) => productISBNList.indexOf(value) === index);
  }

  /**
   * This function is used to get the current product on onchange
   */
  getCurrentProductOnChange() {
    return this._currentProduct.asObservable();
  }

  /**
     * This function is used to set the current product
     */
  setCurrentProduct(CurrentProduct) {
    sessionStorage.setItem(FileConstants.constants.CurrentProduct, JSON.stringify(CurrentProduct));
    this._currentProduct.next(CurrentProduct);
    this._cProduct = CurrentProduct;
  }

  /**
     * This function is used to get the current product cProduct
     */
  getCurrentProduct() {
    if (sessionStorage.getItem(FileConstants.constants.CurrentProduct)) {
      this._cProduct = JSON.parse(sessionStorage.getItem(FileConstants.constants.CurrentProduct));
    }
    return this._cProduct;
  }

  /**
   * set product id from report checklist on change selecting the grade
   * @param productID  Product id
   */
  setProductId(productID) {
    this.currentProductId = productID;
  }
  /**
   * get method to get current product ID
   */
  getProductId() {
    return this.currentProductId;
  }

  /**
   * Get specific product from indexed db
   * @param productId productid for which details is required
   * @param callback method to return only required properties of product
   */
  getProduct(productId, callback) {
    this.IDBService.get(FileConstants.constants.product, productId, (result) => {
      callback(result);
    });
  }

  /**
   * Set Change product carousel status
   * @param value boolean value for enabling and disabling grade carousel
   */
  setProductToCarousel(value: boolean) {
    this._productCarousel.next(value);
  }

  /**
    * Get product carousel status
    */
  getProductToCarousel() {
    return this._productCarousel;
  }


  /**
   * @2@
   * get products from login response
   */

  getAuthorizedProducts() {
    return this._authorizedProductIds;
  }

  /**
   * @2@
   * @param products product list
   * set products from login response of idpResponse property
   */

  populateProductsInLocalDB(products: Array<AuthorizedProduct>) {
    // this.IDBService.put(FileConstants.constants.product, this.setProducts(products)).subscribe();
    this.IDBService.put(FileConstants.constants.product, this.setAuthorizedProduct(products)).subscribe();
  }

  /**
   * setAuthorizedProduct
   * @param authorizedResource list of products with access flag
   */
  setAuthorizedProduct(authorizedResource: Array<AuthorizedProduct>) {
    this._authorizedProductIds.length = 0;
    return authorizedResource.filter((authoriedProduct: AuthorizedProduct) => {
      if (authoriedProduct.hasAccess === true) {
        this._authorizedProductIds.push(authoriedProduct.productId);
      }
      return authoriedProduct.hasAccess === true;
    });
  }
}
