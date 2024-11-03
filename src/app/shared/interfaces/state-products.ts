import { Product } from './product';

export interface StateProducts {
    products: Product[];
    status: 'loading' | 'success' | 'error';
    page: number;
}

export interface StateProductDetail {
    product: Product | null;
    status: 'loading' | 'success' | 'error';
}
