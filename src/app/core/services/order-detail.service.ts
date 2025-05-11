import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from '../models/order-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  // Base URL for the API endpoint related to Order Details
  private baseUrl = `${environment.apiBaseUrl}/order-details`;
  // Injecting HttpClient to make HTTP requests
  private http = inject(HttpClient);

  constructor() {}

  // Fetch all order details
  getAllOrderDetails(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.baseUrl}`);
  }

  // Fetch order details by order ID
  getOrderDetailsByOrderId(orderId: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.baseUrl}/order/${orderId}`);
  }
}
