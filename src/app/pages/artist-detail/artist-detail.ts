import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Album, Artist, Music, Track } from '../home/music';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './artist-detail.html',
  styleUrl: './artist-detail.scss',
})
export class ArtistDetail {
  artist$: Observable<Artist | null>;
  albums$: Observable<Album[] | null>;
  topTracks$: Observable<Track[] | null>;

  constructor(private route: ActivatedRoute, private musicService: Music) {
    this.artist$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.musicService.getArtistById(id)),
      map((response) => (response.artists ? response.artists[0] : null)),
    );

    this.albums$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => (id ? this.musicService.getArtistAlbums(id) : of({ album: null }))),
      map((response) => response.album),
    );

    this.topTracks$ = this.artist$.pipe(
      filter(artist => !!artist),
      switchMap(artist => this.musicService.getTopTracksByArtistName(artist.strArtist)),
      map(response => response?.track ?? null)
    );

  }
}
