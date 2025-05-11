import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PizzaTypeService } from '../../../core/services/pizza-type.service';
import { PizzaType } from '../../../core/models/pizza-type.model';
import { PizzaTypePaginatedResponse } from '../../../core/models/pizza-type-pagination.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { PizzaTypeDetailsComponent } from '../pizza-type-details/pizza-type-details.component';

@Component({
  selector: 'app-pizza-type-list',
  imports: [ReactiveFormsModule, SearchBarComponent, PizzaTypeDetailsComponent],
  templateUrl: './pizza-type-list.component.html',
  styleUrl: './pizza-type-list.component.css',
})
export class PizzaTypeListComponent {
  // Injecting PizzaTypeService to fetch pizza type data
  private pizzaTypeService = inject(PizzaTypeService);

  pizzaTypes: PizzaType[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  // Filter controls
  categoryFilter = new FormControl('');

  // Filter values
  searchTerm: string = '';
  selectedCategory: string = '';

  // Available categories (will be populated from the data)
  categories: string[] = [];

  // For detail view
  selectedPizzaType: PizzaType | null = null;
  showDetails: boolean = false;

  ngOnInit(): void {
    this.loadPizzaTypes();
    this.loadCategories();

    // Set up category filter
    this.categoryFilter.valueChanges.subscribe((value) => {
      this.selectedCategory = value || '';
      this.currentPage = 1; // Reset to first page on filter change
      this.loadPizzaTypes();
    });
  }

  // Method to load pizza types from the server
  loadPizzaTypes(): void {
    this.pizzaTypeService
      .getPaginatedPizzaTypes(
        this.currentPage,
        this.pageSize,
        this.searchTerm,
        this.selectedCategory
      )
      .subscribe({
        next: (response: PizzaTypePaginatedResponse) => {
          this.pizzaTypes = response.pizzaTypes;
          this.totalCount = response.totalCount;
          this.calculateTotalPages(); // Recalculate total pages after loading data
        },
        error: (error) => {
          console.error('Error loading pizza types:', error);
        },
      });
  }

  // Load available categories for filter dropdown
  loadCategories(): void {
    this.pizzaTypeService.getPizzaTypeCategories().subscribe({
      next: (categories: string[]) => {
        console.log('Categories loaded:', categories);
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  // Method for explicit search button click
  onSearch(term: string): void {
    this.searchTerm = term?.trim() || '';
    this.currentPage = 1; // Reset to first page on search
    this.loadPizzaTypes();
  }

  // Clear all filters
  clearFilters(): void {
    this.categoryFilter.setValue('', { emitEvent: false });
    this.selectedCategory = '';
    this.currentPage = 1;
    this.loadPizzaTypes();
  }

  // Method to change pages
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadPizzaTypes(); // reload pizza types for the selected page
  }

  // Method to calculate total pages manually
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    if (this.totalPages === 0) {
      this.totalPages = 1; // Always have at least 1 page even if empty
    }
  }

  // Method to show details of a selected pizza type
  openDetails(pizzaTypeId: string): void {
    this.pizzaTypeService.getPizzaTypeById(pizzaTypeId).subscribe({
      next: (data) => {
        this.selectedPizzaType = data;
        this.showDetails = true;
      },
      error: (err) => console.error('Failed to fetch pizza type details', err),
    });
  }

  // Method to close the details view
  closeDetails(): void {
    this.selectedPizzaType = null;
    this.showDetails = false;
  }
}
