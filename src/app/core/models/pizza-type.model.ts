import { Pizza } from './pizza.model';

export interface PizzaType {
  pizzaTypeId: string;
  name: string;
  category: string;
  ingredients: string;
  pizzas?: Pizza[]; // Optional: used only in details view
}
