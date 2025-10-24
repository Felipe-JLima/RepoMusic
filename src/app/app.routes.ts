import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './auth/auth.guard';
import { ArtistDetail } from './pages/artist-detail/artist-detail';
import { AlbumDetail } from './pages/album-detail/album-detail';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'artist/:id',
    component: ArtistDetail,
    canActivate: [authGuard],
  },
  {
    path: 'album/:id',
    component: AlbumDetail,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
