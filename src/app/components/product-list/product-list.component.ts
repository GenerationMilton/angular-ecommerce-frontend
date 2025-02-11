import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  //array of product
  products: Product[] = [];

  //add currente category Id
  currentCategoryId:number=1;

  //Update component to read the category name
  currentCategoryName: string = "";

  //add boolean search
  searchMode: boolean=false;


  constructor(private productService: ProductService,
  private route: ActivatedRoute){}

  ngOnInit(): void{
    //define paramMap to products
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
    this.listProducts();
  }

  listProducts() {

    this.searchMode= this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    
    else {
      this.handleListProducts();
    }
    
  }

  //new method
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //now search for the products using keyowrd
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products=data;
      }
    )
  }

  //new method to search products

  handleListProducts(){

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
 
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }

    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    )

  }

}
