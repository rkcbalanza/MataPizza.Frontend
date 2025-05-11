import { Component, Input } from '@angular/core';
import { PizzaType } from '../../../core/models/pizza-type.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-type-details',
  imports: [CommonModule],
  templateUrl: './pizza-type-details.component.html',
  styleUrl: './pizza-type-details.component.css',
})
export class PizzaTypeDetailsComponent {
  @Input() pizzaType!: PizzaType;
  @Input() show = false;
  @Input() onClose: () => void = () => {};
}
