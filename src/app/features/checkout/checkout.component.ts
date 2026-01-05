import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../../core/services/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { OrderService } from '../../core/services/order.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
    checkoutForm: FormGroup;
    cartItems = computed(() => this.cartService.cartItems());
    totalAmount = computed(() => this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0));

    constructor(
        private fb: FormBuilder,
        private cartService: Cart,
        private orderService: OrderService,
        private router: Router
    ) {
        this.checkoutForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
            paymentMethod: ['cod', Validators.required]
        });
    }

    onSubmit() {
        if (this.checkoutForm.valid) {
            // Get current cart items
            const items = this.cartItems();
            const total = this.totalAmount();

            const orderData = {
                ...this.checkoutForm.value,
                items: items,
                total: total,
                shippingDetails: this.checkoutForm.value
            };

            this.orderService.placeOrder(orderData);

            alert('Order Placed Successfully!');
            this.cartService.clearCart();
            this.router.navigate(['/orders']); // Redirect to orders page vs home
        } else {
            this.checkoutForm.markAllAsTouched();
        }
    }
}
