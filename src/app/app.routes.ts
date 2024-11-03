import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./admin/admin.routes'),
        canActivate: [authGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/features/auth.routes')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
