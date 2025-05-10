import { Order } from './order.model';

export interface OrderPaginatedResponse {
  orders: Order[];
  totalCount: number;
  totalSales: number;
  totalItems: number;
}
