import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      //{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/order-list/order-list.component').then(
            (o) => o.OrderListComponent
          ),
      },
      {
        path: 'pizzas',
        loadComponent: () =>
          import(
            './features/pizza-types/pizza-type-list/pizza-type-list.component'
          ).then((p) => p.PizzaTypeListComponent),
      },
    ],
  },
];
