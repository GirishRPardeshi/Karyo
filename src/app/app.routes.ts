// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(c => c.HomeComponent)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-history.component').then(c => c.OrderHistoryComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component')
        .then(c => c.SignupComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component')
        .then(c => c.NotFoundComponent)
  }
];
