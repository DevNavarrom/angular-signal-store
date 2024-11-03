import { inject, Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { StateProductDetail } from '../../../shared/interfaces/state-products';
import { signalSlice } from 'ngxtension/signal-slice';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailStateService {

  private productsService = inject(ProductsService);

  private initialState: StateProductDetail = {
    product: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) => $.pipe(
        switchMap((id) => this.productsService.getProduct(id)),
        map( data => ({ product: data, status: 'success' as const }) )
      )
    },
  })
}
