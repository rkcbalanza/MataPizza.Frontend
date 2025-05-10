import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  // Base URL for the API endpoint related to Pizza Types
  private baseUrl = `${environment.apiBaseUrl}/pizzas`;
  // Injecting HttpClient to make HTTP requests
  private http = inject(HttpClient);

  constructor() {}

  // Fetch all pizza types
  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.baseUrl}`);
  }

  // Fetch pizza type by ID
  getPizzaById(pizzaId: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.baseUrl}/${pizzaId}`);
  }
}
