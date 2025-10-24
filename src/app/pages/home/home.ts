import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Artist, ArtistResponse, Music } from './music';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  tap,
  startWith, // Importar startWith
} from 'rxjs';

import { Auth } from '../../auth/auth';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchControl = new FormControl('');
  artists$: Observable<Artist[] | null>;
  searchHistory$ = new BehaviorSubject<Artist[]>([]);
  isSearching$ = new BehaviorSubject<boolean>(false);
  private readonly historyKey = 'repoMusicHistory';

  constructor(
    private musicService: Music,
    private authService: Auth,
    private router: Router
  ) {
    this.loadHistory();

    // Inscrição separada para atualizar isSearching$ com base no valor do searchControl
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value), // Emite o valor inicial (string vazia)
      map(term => !!term && term.length > 0), // Converte o termo para booleano (true se não estiver vazio)
      distinctUntilChanged() // Emite apenas se o valor booleano mudar
    ).subscribe(isSearching => this.isSearching$.next(isSearching));

    this.artists$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term): term is string => term !== null && term.length > 0),
      switchMap(term => this.musicService.searchArtists(term)),
      tap(response => console.log('API Search Artists Response:', response)), // Adicionado para depuração
      map(response => response.artists)
    );
  }

  private loadHistory() {
    const historyJson = localStorage.getItem(this.historyKey);
    const history = historyJson ? JSON.parse(historyJson) : [];
    this.searchHistory$.next(history);
  }

  viewArtist(artist: Artist) {
    const currentHistory = this.searchHistory$.getValue();
    // Remove o artista se ele já existir para movê-lo para o topo
    const filteredHistory = currentHistory.filter(h => h.idArtist !== artist.idArtist);
    // Adiciona o artista no início e limita o histórico a 10 itens
    const newHistory = [artist, ...filteredHistory].slice(0, 10);

    localStorage.setItem(this.historyKey, JSON.stringify(newHistory));
    this.searchHistory$.next(newHistory);

    this.router.navigate(['/artist', artist.idArtist]);
  }

  clearHistory() {
    localStorage.removeItem(this.historyKey);
    this.searchHistory$.next([]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
