import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item.model';

export interface Order {
    id: number;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    shippingDetails: any;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orders: Order[] = []; // In-memory fallback
    private ordersSubject = new BehaviorSubject<Order[]>([]);
    orders$ = this.ordersSubject.asObservable();

    constructor(private http: HttpClient) {
        const saved = localStorage.getItem('orders');
        if (saved) {
            this.orders = JSON.parse(saved);
            this.ordersSubject.next(this.orders);
        }
    }

    placeOrder(order: Omit<Order, 'id' | 'date' | 'status'>) {
        const newOrder: Order = {
            ...order,
            id: Math.floor(Math.random() * 10000),
            date: new Date().toISOString(),
            status: 'Processing'
        };

        this.orders.push(newOrder);
        this.saveOrders();
        this.ordersSubject.next([...this.orders]);
        console.log('Order Service: Order placed', newOrder);
    }

    private saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    getOrders(): Observable<Order[]> {
        return this.ordersSubject.asObservable();
    }

    deleteOrder(orderId: number) {
        this.orders = this.orders.filter(o => o.id !== orderId);
        this.saveOrders();
        this.ordersSubject.next([...this.orders]);
    }
}
