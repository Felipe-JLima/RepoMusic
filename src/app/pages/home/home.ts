import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArtistResponse, Music } from './music';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  tap,
} from 'rxjs';

import { Auth } from '../../auth/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchControl = new FormControl('');
  artists$: Observable<ArtistResponse['artists']>;

  constructor(
    private musicService: Music,
    private authService: Auth,
    private router: Router
  ) {
    this.artists$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term): term is string => term !== null && term.length > 0),
      switchMap(term => this.musicService.searchArtists(term)),
      tap(response => console.log('API Search Artists Response:', response)), // Adicionado para depuração
      map(response => response.artists)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
