import { Component, inject, input, output } from '@angular/core';
import { ProductItemCart } from '../../../../shared/interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent {

  productCartItem = input.required<ProductItemCart>();

  onRemove = output<number>();

  onIncrease = output<ProductItemCart>();
  onDecrease = output<ProductItemCart>();

}
