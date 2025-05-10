import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { OrderPaginatedResponse } from '../models/order-pagination.model';

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

  // Fetch paginated orders
  // This method takes page and size as parameters to fetch a specific page of orders
  getPaginatedOrders(
    page: number,
    size: number
  ): Observable<OrderPaginatedResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', size);

    return this.http.get<OrderPaginatedResponse>(`${this.baseUrl}/paginated`, {
      params,
    });
  }

  // Fetch order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }
}
