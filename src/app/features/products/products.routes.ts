// src/app/features/products/products.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailsComponent
  }
];
