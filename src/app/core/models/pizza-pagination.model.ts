import { Pizza } from './pizza.model';

export interface PizzaPaginatedResponse {
  pizzas: Pizza[];
  totalCount: number;
}
