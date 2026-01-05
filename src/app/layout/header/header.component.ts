import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { Cart } from '../../core/services/cart.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    private productService = inject(ProductService);
    private authService = inject(AuthService);
    private cartService = inject(Cart);

    // Reactive signals
    isAuthenticated = this.authService.isAuthenticated;
    currentUser = this.authService.currentUser;
    cartItemCount = computed(() => this.cartService.getItemCount());

    ngOnInit() {
        // Component initialization if needed
    }

    onSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        this.productService.updateSearchTerm(input.value);
    }

    logout() {
        this.authService.logout();
    }
}
