import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { StateProducts } from '../../../shared/interfaces/state-products';
import { ProductsService } from './products.service';
import { Product } from '../../../shared/interfaces/product';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsStateService {

  private productsService = inject(ProductsService);

  private initialState: StateProducts = {
    products: [],
    status: 'loading' as const,
    page: 1
  };

  changePage$ = new Subject<number>();

  loadProducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.productsService.getProducts(page)),
    map((products: Product[]) => ({ products, status: 'success' as const })),
    catchError(() => {
      return of({
        products: [],
        status: 'error' as const
      })
    })
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({ page, status: 'loading' as const }))
      ),
      this.loadProducts$
    ],
  })

}
