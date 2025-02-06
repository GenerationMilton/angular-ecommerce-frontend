import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';

  //new url to product-category
  private categoryUrl ='http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  //update the get product method to product master detail view
  getProduct(theProductId: number):Observable<Product> {
    //need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
    
  }
 

  //update the category argument to product-list

  getProductList(theCategoryId:number): Observable<Product[]>{

    //need to build URL based on category id 
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);    

  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    //need to build URL based on the keyword
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
    
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products)
    );
  }

  //add new method to service in order to use listProductCategories in menu component
  getProductCategories() {
    
    //this.categoryUrl CALL RestApi
    //response._embedded.productCategory Returns an observable, maps the JSON data from Spring Data REST to productCategory array
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}


//Interface GetResponse
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

//Interface GetResponseProductCategory add
//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}