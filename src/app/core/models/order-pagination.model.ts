import { Order } from './order.model';

export interface OrderPaginatedResponse {
  orders: Order[];
  totalCount: number;
}
