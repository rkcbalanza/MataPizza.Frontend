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
    size: number,
    searchTerm: string = '',
    startDate: string = '',
    endDate: string = '',
    minPrice: number | null = null,
    maxPrice: number | null = null
  ): Observable<OrderPaginatedResponse> {
    let params = new HttpParams().set('page', page).set('pageSize', size);

    // Add search parameter if there's a search term
    if (searchTerm && searchTerm.trim() !== '') {
      params = params.set('search', searchTerm.trim());
    }

    // Add date range filters if selected
    if (startDate && startDate.trim() !== '') {
      params = params.set('startDate', startDate.trim());
    }
    if (endDate && endDate.trim() !== '') {
      params = params.set('endDate', endDate.trim());
    }

    // Add minPrice and maxPrice filters if selected
    if (minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    // Make the HTTP GET request with the parameters
    return this.http.get<OrderPaginatedResponse>(`${this.baseUrl}/paginated`, {
      params,
    });
  }

  // Fetch order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }
}
