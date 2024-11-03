import { Component, effect, inject } from '@angular/core';
import { CartItemComponent } from "./ui/cart-item/cart-item.component";
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { ProductItemCart } from '../../shared/interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {

  state = inject(CartStateService).state;

  constructor() {
    effect(() => {
      this.state.load();
    });
  }

  onRemoveItem(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity - 1,
    });
  }

  calculateTotal(): number {
    return (this.state.price() + this.state.tax() - this.state.savings());
  }
}
