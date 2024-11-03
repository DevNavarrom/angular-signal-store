import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";

export default [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./products/features/product.routes')
            },
            {
                path: 'cart',
                loadChildren: () => import('./cart/cart.routes')
            }
        ]
    }
] as Routes;