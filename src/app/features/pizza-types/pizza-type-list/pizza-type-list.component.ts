import { Component, inject } from '@angular/core';
import { PizzaTypeService } from '../../../core/services/pizza-type.service';
import { PizzaType } from '../../../core/models/pizza-type.model';
import { PizzaTypePaginatedResponse } from '../../../core/models/pizza-type-pagination.model';

@Component({
  selector: 'app-pizza-type-list',
  imports: [],
  templateUrl: './pizza-type-list.component.html',
  styleUrl: './pizza-type-list.component.css',
})
export class PizzaTypeListComponent {
  private pizzaTypeService = inject(PizzaTypeService);
  pizzaTypes: PizzaType[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadOrders();
  }

  // Method to load orders from the server
  loadOrders(): void {
    this.pizzaTypeService
      .getPaginatedPizzaTypes(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PizzaTypePaginatedResponse) => {
          console.log('Response:', response);
          this.pizzaTypes = response.pizzaTypes;
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
