import { PizzaType } from './pizza-type.model';

export interface PizzaTypePaginatedResponse {
  pizzaTypes: PizzaType[];
  totalCount: number;
}
