import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CartStateService } from '../../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgClass, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductDetailStateService]
})
export default class ProductDetailComponent {

  productDetailState = inject(ProductDetailStateService).state;
  cartState = inject(CartStateService).state;

  id = input.required<string>();
  rate: number = 0;

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
      this.rate = this.productDetailState.product()?.rating?.rate ?? 0;
    });
  }

  addToCart() {
    this.cartState.add(
      {
        product: this.productDetailState.product()!,
        quantity: 1,
      }
    );
  }

}
