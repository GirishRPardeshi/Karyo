import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../core/services/order.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
    orders$: Observable<Order[]>;

    constructor(private orderService: OrderService) {
        this.orders$ = this.orderService.getOrders();
    }

    ngOnInit() { }

    deleteOrder(orderId: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            this.orderService.deleteOrder(orderId);
        }
    }
}
