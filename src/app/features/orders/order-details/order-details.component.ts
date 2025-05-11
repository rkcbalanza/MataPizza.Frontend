import { Component, Input } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  @Input() order!: Order;
  @Input() show = false;
  @Input() onClose: () => void = () => {};
}
