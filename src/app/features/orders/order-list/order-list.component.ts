import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { OrderPaginatedResponse } from '../../../core/models/order-pagination.model';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchBarComponent,
    OrderDetailsComponent,
  ],
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

  // Filter controls
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');
  startDateControl = new FormControl('');
  endDateControl = new FormControl('');

  // Search and Filter values
  isFilterVisible: boolean = false;
  priceRangeError: boolean = false;
  dateRangeError: boolean = false;
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // For detail view
  selectedOrder: Order | null = null;
  showDetails: boolean = false;

  // For order summary
  totalSales: number = 0;
  totalItems: number = 0;

  ngOnInit(): void {
    this.loadOrders();
  }

  // Apply Filters (based on the selected values)
  applyFilters(): void {
    if (!this.isDateRangeValid()) {
      this.dateRangeError = true;
      return;
    }

    if (!this.isPriceRangeValid()) {
      this.priceRangeError = true;
      return;
    }

    this.dateRangeError = false;
    this.priceRangeError = false;
    this.startDate = this.startDateControl.value || '';
    this.endDate = this.endDateControl.value || '';
    this.minPrice = this.minPriceControl.value
      ? parseFloat(this.minPriceControl.value)
      : null;
    this.maxPrice = this.maxPriceControl.value
      ? parseFloat(this.maxPriceControl.value)
      : null;
    this.currentPage = 1;
    this.loadOrders();
  }

  // Validate the date range
  isDateRangeValid(): boolean {
    const start = this.startDateControl.value;
    const end = this.endDateControl.value;

    if (start && end) {
      return new Date(start) <= new Date(end);
    }
    return true; // valid if one or both are empty
  }

  // Validate the price range
  isPriceRangeValid(): boolean {
    const minPrice = this.minPriceControl.value;
    const maxPrice = this.maxPriceControl.value;
    return !minPrice || !maxPrice || minPrice <= maxPrice;
  }

  // Method to load orders from the server
  loadOrders(): void {
    this.orderService
      .getPaginatedOrders(
        this.currentPage,
        this.pageSize,
        this.searchTerm,
        this.startDate,
        this.endDate,
        this.minPrice,
        this.maxPrice
      )
      .subscribe({
        next: (response: OrderPaginatedResponse) => {
          this.orders = response.orders;
          this.totalCount = response.totalCount;
          this.totalSales = response.totalSales;
          this.totalItems = response.totalItems;
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

  // Method for explicit search button click
  onSearch(term: string): void {
    this.searchTerm = term?.trim() || '';
    this.currentPage = 1; // Reset to first page on search
    this.loadOrders();
  }

  // Toggle filter visibility
  toggleFilterVisibility(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.startDateControl.setValue('', { emitEvent: false });
    this.endDateControl.setValue('', { emitEvent: false });
    this.minPriceControl.setValue('', { emitEvent: false });
    this.maxPriceControl.setValue('', { emitEvent: false });
    this.dateRangeError = false;
    this.priceRangeError = false;
    this.loadOrders();
  }

  // Method to show details of a selected pizza type
  openDetails(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe({
      next: (data) => {
        this.selectedOrder = data;
        this.showDetails = true;
      },
      error: (err) => console.error('Failed to fetch pizza type details', err),
    });
  }

  // Method to close the details view
  closeDetails(): void {
    this.selectedOrder = null;
    this.showDetails = false;
  }
}
