import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../core/services/product.service';
import { Cart } from '../../core/services/cart.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // Display this
  categories: string[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartservice: Cart,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const products$ = this.productService.getProducts();
    const search$ = this.productService.getSearchTerm();

    combineLatest([products$, search$]).subscribe({
      next: ([products, term]) => {
        let result = products;
        if (term) {
          const lowerTerm = term.toLowerCase();
          result = result.filter(p =>
            p.title.toLowerCase().includes(lowerTerm) ||
            p.category.toLowerCase().includes(lowerTerm)
          );
        }

        this.products = products;
        this.filteredProducts = result.slice(0, 8);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.filteredProducts = [];
        this.isLoading = false;
      }
    });

    this.productService.getCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = categories;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error loading categories:', err)
    });
  }

  addToCart(product: Product) {
    this.cartservice.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail || product.image
    });
  }

  trackByCategory(index: number, category: string) {
    return category;
  }

  trackByProduct(index: number, product: Product) {
    return product.id;
  }

  getCategoryImage(category: string): string {
    const categoryImages: { [key: string]: string } = {
      'mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      'laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      'fashion': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    };
    return categoryImages[category] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
  }
}
