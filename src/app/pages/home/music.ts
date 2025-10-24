import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface simples para a resposta da API de artistas
export interface ArtistResponse {
  artists: any[] | null; // A API retorna null se nenhum artista for encontrado
}

// Interface para a resposta da API de álbuns
export interface AlbumResponse {
  album: any[] | null;
}

// Interface para a resposta da API de faixas
export interface TrackResponse {
  track: any[] | null;
}

@Injectable({
  providedIn: 'root'
})
export class Music {
  private apiKey = '123';// Chave de API gratuita do TheAudioDB
  //private apiUrl = `https://www.theaudiodb.com/api/v1/json/${this.apiKey}`;
  private apiUrl = `/api/v1/json/${this.apiKey}`;

  constructor(private http: HttpClient) { }

  searchArtists(term: string): Observable<ArtistResponse> {
    const encodedTerm = encodeURIComponent(term);
    return this.http.get<ArtistResponse>(`${this.apiUrl}/search.php?s=${encodedTerm}`);
  }

  getArtistById(id: string): Observable<ArtistResponse> {
    return this.http.get<ArtistResponse>(`${this.apiUrl}/artist.php?i=${id}`);
  }

  getArtistAlbums(artistId: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`${this.apiUrl}/album.php?i=${artistId}`);
  }

  getTopTracksByArtistName(artistName: string): Observable<TrackResponse> {
    const encodedArtistName = encodeURIComponent(artistName);
    return this.http.get<TrackResponse>(`${this.apiUrl}/track-top10.php?s=${encodedArtistName}`);
  }

  getAlbumById(albumId: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`${this.apiUrl}/album.php?m=${albumId}`);
  }

  getTracksByAlbumId(albumId: string): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(`${this.apiUrl}/track.php?m=${albumId}`); // This endpoint is often unreliable on the free tier
  }
}
