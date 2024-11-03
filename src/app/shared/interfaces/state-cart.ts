import { ProductItemCart } from "./product";

export interface StateCart {
    products: ProductItemCart[];
    loaded: boolean;
}
