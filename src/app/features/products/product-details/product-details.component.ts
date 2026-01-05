import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductService, Product } from '../../../core/services/product.service';
import { Cart } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(Cart);
  private authService = inject(AuthService);

  // Signal-based state
  product = signal<Product | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID from route:', id);

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          console.log('Product from API:', product);
          this.product.set(product);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.isLoading.set(false);
        }
      });
    }
  }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      alert('Please login to add items to cart');
      return;
    }

    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart({
        id: currentProduct.id,
        name: currentProduct.title,
        price: currentProduct.price,
        quantity: 1,
        image: currentProduct.thumbnail || currentProduct.image
      });
      alert(`${currentProduct.title} added to cart!`);
    }
  }

  trackByImage(index: number, img: string) {
    return img;
  }
}
