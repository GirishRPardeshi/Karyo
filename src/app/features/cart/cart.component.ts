import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../core/services/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems = computed(() => this.cartService.cartItems());
  totalAmount = computed(() => this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0));
  totalItems = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  // Fake tax/discount logic for demo
  discount = 0;
  tax = 0;

  constructor(private cartService: Cart) {}

  ngOnInit() { }

  increaseQty(id: number) {
    this.cartService.increaseQty(id);
  }

  decreaseQty(id: number) {
    this.cartService.decreaseQty(id);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  placeOrder() {
    alert('Order placed successfully! (Demo)');
    this.cartService.clearCart();
  }
}
