import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { OrderPaginatedResponse } from '../../../core/models/order-pagination.model';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent implements OnInit {
  // Injecting OrderService to fetch order data
  private orderService = inject(OrderService);
  orders: Order[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadOrders();
  }

  // Method to load orders from the server
  loadOrders(): void {
    this.orderService
      .getPaginatedOrders(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: OrderPaginatedResponse) => {
          this.orders = response.orders;
          this.totalCount = response.totalCount;
          this.calculateTotalPages(); // Recalculate total pages after loading data
        },
        error: (error) => {
          console.error('Error loading orders:', error);
        },
      });
  }

  // Method to change pages
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadOrders(); // reload orders for the selected page
  }

  // Method to calculate total pages manually
  calculateTotalPages(): void {
    this.totalPages = Math.floor(this.totalCount / this.pageSize);
    if (this.totalCount % this.pageSize !== 0) {
      this.totalPages += 1; // Add an extra page if there are remaining items
    }
  }
}
