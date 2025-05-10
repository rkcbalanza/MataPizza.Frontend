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
    page: number,
    size: number
  ): Observable<PizzaTypePaginatedResponse> {
    // Create HttpParams to pass pagination parameters
    const params = new HttpParams().set('page', page).set('pageSize', size);

    return this.http.get<PizzaTypePaginatedResponse>(
      `${this.baseUrl}/paginated`,
      {
        params,
      }
    );
  }

  // Fetch pizza type by ID
  getPizzaTypeById(pizzaTypeId: number): Observable<PizzaType> {
    return this.http.get<PizzaType>(`${this.baseUrl}/${pizzaTypeId}`);
  }
}
