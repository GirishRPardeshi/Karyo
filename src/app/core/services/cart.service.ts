import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class Cart {

  private _cartItems = signal<CartItem[]>([]);
  cartItems = computed(() => this._cartItems());

  constructor(private authService: AuthService) {
    // Load cart from localStorage when user logs in
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadUserCart(user.id);
      } else {
        this._cartItems.set([]);
      }
    });
  }

  addToCart(item: CartItem) {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const items = [...this.cartItems()];
    const existing = items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this._cartItems.set(items);
    this.saveUserCart(user.id, items);
  }

  increaseQty(id: number) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const items = [...this.cartItems()];
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity++;
      this._cartItems.set(items);
      this.saveUserCart(user.id, items);
    }
  }

  decreaseQty(id: number) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const items = [...this.cartItems()];
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeItem(id);
      } else {
        this._cartItems.set(items);
        this.saveUserCart(user.id, items);
      }
    }
  }

  removeItem(id: number) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const items = this.cartItems().filter(i => i.id !== id);
    this._cartItems.set(items);
    this.saveUserCart(user.id, items);
  }

  clearCart() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this._cartItems.set([]);
    this.saveUserCart(user.id, []);
  }

  getTotal(): number {
    return this.cartItems().reduce(
      (sum, i) => sum + i.price * i.quantity, 0
    );
  }

  getItemCount(): number {
    return this.cartItems().reduce((sum, i) => sum + i.quantity, 0);
  }

  private saveUserCart(userId: number, items: CartItem[]) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  }

  private loadUserCart(userId: number) {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        this._cartItems.set(items);
      } catch (error) {
        console.error('Error loading cart:', error);
        this._cartItems.set([]);
      }
    } else {
      this._cartItems.set([]);
    }
  }
}
