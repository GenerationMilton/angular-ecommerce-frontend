import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';

import {Routes, RouterModule} from '@angular/router';
import { ProductCategotyMenuComponent } from './components/product-categoty-menu/product-categoty-menu.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

//define our routes of products
const routes:Routes=[
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch:'full'},
  {path: '**', redirectTo:'/products',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategotyMenuComponent,
    ProductCategoryMenuComponent
  ],
  //declare RouterModule for our routes
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
