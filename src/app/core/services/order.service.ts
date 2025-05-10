import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // Base URL for the API endpoint related to Orders
  private baseUrl = `${environment.apiBaseUrl}/orders`;
  // Injecting HttpClient to make HTTP requests
  private http = inject(HttpClient);

  constructor() {}

  // Fetch all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }
}
