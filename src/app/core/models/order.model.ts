import { OrderDetail } from './order-detail.model';

export interface Order {
  orderId: number;
  orderDate: string;
  orderTime: string;
  totalItems: number;
  totalPrice: number;
  orderDetails?: OrderDetail[]; // Optional: used only in details view
}
