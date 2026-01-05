import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';
import { Cart } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(Cart);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  // Signal-based state
  allProducts = signal<Product[]>([]);
  isLoading = signal(true);
  selectedCategory = signal('');
  selectedPriceRange = signal('');
  searchTerm = signal('');

  // Computed signal for filtered products - automatically updates when dependencies change
  products = computed(() => {
    let filtered = this.allProducts();
    
    if (this.selectedCategory()) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === this.selectedCategory().toLowerCase()
      );
    }

    if (this.searchTerm()) {
      const lowerTerm = this.searchTerm().toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(lowerTerm) ||
        p.category.toLowerCase().includes(lowerTerm)
      );
    }

    if (this.selectedPriceRange()) {
      filtered = filtered.filter(p => this.isInPriceRange(p.price));
    }

    return filtered;
  });

  // Computed signal to check if any filters are active
  hasActiveFilters = computed(() => {
    return !!(this.selectedCategory() || this.selectedPriceRange() || this.searchTerm());
  });

  constructor() {
    // Effect to handle side effects (like API calls)
    effect(() => {
      // This would run whenever searchTerm changes
      console.log('Search term changed:', this.searchTerm());
    });
  }

  ngOnInit() {
    // Load initial data
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading.set(false);
      }
    });

    // Reactive search term updates
    this.productService.getSearchTerm().subscribe(term => {
      this.searchTerm.set(term);
    });

    // Reactive category changes
    this.route.queryParams.subscribe(params => {
      this.selectedCategory.set(params['category'] || '');
    });
  }

  // ... rest of methods remain similar but can update signals
  onCategoryChange(category: string, checked: boolean) {
    this.selectedCategory.set(checked ? category : '');
  }

  onPriceChange(range: string) {
    this.selectedPriceRange.set(range);
  }

  clearAllFilters() {
    this.selectedCategory.set('');
    this.selectedPriceRange.set('');
    this.searchTerm.set('');
    // Clear radio buttons
    const radioButtons = document.querySelectorAll('input[name="price"]:checked');
    radioButtons.forEach(button => (button as HTMLInputElement).checked = false);
    // Clear checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => (checkbox as HTMLInputElement).checked = false);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();

    if (!this.authService.isAuthenticated()) {
      alert('Please login to add items to cart');
      return;
    }

    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image || product.thumbnail || product.images?.[0]
    });
    alert(`${product.title} added to cart!`);
  }

  private isInPriceRange(price: number): boolean {
    switch (this.selectedPriceRange()) {
      case 'under10000': return price < 10000;
      case '10000-50000': return price >= 10000 && price <= 50000;
      case 'over50000': return price > 50000;
      default: return true;
    }
  }
}