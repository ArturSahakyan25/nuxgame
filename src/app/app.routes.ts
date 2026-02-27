import { Routes } from '@angular/router';
import {Layout} from './layout/layout';
import {HomePage} from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      { path: '', component: HomePage },
    ]
  }
];
