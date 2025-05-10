export interface OrderDetail {
  orderDetailId: number;
  orderId: number;
  pizzaId: string;
  pizzaTypeName: string;
  size: string;
  quantity: number;
  priceEach: number;
  totalPrice: number;
}
