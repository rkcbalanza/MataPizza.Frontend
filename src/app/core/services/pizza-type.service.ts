import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PizzaType } from '../models/pizza-type.model';
import { Observable } from 'rxjs';
import { PizzaTypePaginatedResponse } from '../models/pizza-type-pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaTypeService {
  // Base URL for the API endpoint related to Pizza Types
  private baseUrl = `${environment.apiBaseUrl}/pizzaTypes`;
  // Injecting HttpClient to make HTTP requests
  private http = inject(HttpClient);

  constructor() {}

  // Fetch all pizza types
  getAllPizzaTypes(): Observable<PizzaType[]> {
    return this.http.get<PizzaType[]>(`${this.baseUrl}`);
  }

  // Fetch paginated pizza types
  // This method takes page and size as parameters to fetch a specific page of pizza types
  getPaginatedPizzaTypes(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
    category: string = ''
  ): Observable<PizzaTypePaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    // Add search parameter if there's a search term
    if (searchTerm && searchTerm.trim() !== '') {
      params = params.set('search', searchTerm.trim());
    }

    // Add category filter if selected
    if (category && category.trim() !== '') {
      params = params.set('category', category.trim());
    }

    // Make the HTTP GET request with the parameters
    return this.http.get<PizzaTypePaginatedResponse>(
      `${this.baseUrl}/paginated`,
      {
        params,
      }
    );
  }

  // Fetch pizza type by ID
  getPizzaTypeById(pizzaTypeId: string): Observable<PizzaType> {
    return this.http.get<PizzaType>(`${this.baseUrl}/${pizzaTypeId}`);
  }

  // Fetch all pizza type category
  getPizzaTypeCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/category`);
  }
}
