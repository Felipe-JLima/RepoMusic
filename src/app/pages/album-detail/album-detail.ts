import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumResponse, Music } from '../home/music';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss',
})
export class AlbumDetail {
  album$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private musicService: Music,
  ) {
    this.album$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => console.log('ID do Álbum da URL:', id)),
      switchMap(id => (id ? this.musicService.getAlbumById(id) : of(null))),
      map(response => response?.album?.[0] ?? null)
    );
  }
}
