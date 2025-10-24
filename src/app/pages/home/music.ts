import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// --- Interfaces de Modelo ---
export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb?: string;
  strArtistFanart?: string;
  strGenre?: string;
  strBiographyEN?: string;
  strBiographyPT?: string;
}

export interface Album {
  idAlbum: string;
  idArtist: string;
  strAlbum: string;
  strArtist: string;
  intYearReleased: string;
  strAlbumThumb?: string;
  strDescriptionEN?: string;
  strDescriptionPT?: string;
}

export interface Track {
  idTrack: string;
  strTrack: string;
  strAlbum: string;
  strMusicVid?: string;
}

// --- Interfaces de Resposta da API ---
export interface ArtistResponse {
  artists: Artist[] | null;
}

export interface AlbumResponse {
  album: Album[] | null;
}

export interface TrackResponse {
  track: Track[] | null;
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
