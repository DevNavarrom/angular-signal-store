import { inject, Injectable, effect, Signal } from '@angular/core';
import { StateCart } from '../interfaces/state-cart';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';
import { ProductItemCart } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {

  private _storageServices = inject(StorageService);

  private initialState: StateCart = {
    products: [],
    loaded: false,
  }


  loadProducts$ = this._storageServices.loadProducts().pipe(
    map((data) => ({ products: data, loaded: true}))
  );


  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadProducts$],
    actionSources: {
      add: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(
          map((product) => this.add(state, product)),
        ),
      remove: (state, action$: Observable<number>) => action$.pipe(map((id) => this.remove(state, id))),
      update: (state, action$: Observable<ProductItemCart>) => action$.pipe(map(product => this.update(state, product))),
    },
    selectors: (state) => ({
      load: () => {
        if (state().loaded) {
          this._storageServices.saveProducts(state().products);
        }
      },
      count: () => state().products.reduce((acc, product) => acc + product.quantity, 0),
      price: () => state().products.reduce((acc, product) => acc + product.product.price * product.quantity, 0),
      tax: () => state().products.reduce((acc, product) => acc + product.product.price * product.quantity * 0.1, 0),
      savings: () => state().products.reduce((acc, product) => acc + product.product.price * product.quantity * 0.05, 0),
    })
  });


  private add(state: Signal<StateCart>, product: ProductItemCart) {

    const isInCart = state().products.find((p) => p.product.id === product.product.id);

    if (!isInCart) {
      return {
        products: [...state().products, {...product, quantity: 1}]
      }
    }

    isInCart.quantity += 1;

    return {
      products: [...state().products]
    }
  }


  private remove(state: Signal<StateCart>, id: number) {
    return {
      products: state().products.filter((product) => product.product.id !== id),
    }
  }


  private update(state: Signal<StateCart>, product: ProductItemCart) {
    
    const products = state().products.map((productInCart) => {
      if (productInCart.product.id === product.product.id) {
        return {...productInCart, quantity: product.quantity}
      }

      return productInCart;
    });

    return { products }
  }

}
