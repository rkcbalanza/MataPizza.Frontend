import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PizzaType } from '../models/pizza-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PizzaTypeService {
  // Base URL for the API endpoint related to Pizza Types
  private baseUrl = `${environment.apiBaseUrl}/pizza-types`;
  // Injecting HttpClient to make HTTP requests
  private http = inject(HttpClient);

  constructor() {}

  // Fetch all pizza types
  getAllPizzaTypes(): Observable<PizzaType[]> {
    return this.http.get<PizzaType[]>(`${this.baseUrl}`);
  }

  // Fetch pizza type by ID
  getPizzaTypeById(pizzaTypeId: number): Observable<PizzaType> {
    return this.http.get<PizzaType>(`${this.baseUrl}/${pizzaTypeId}`);
  }
}
