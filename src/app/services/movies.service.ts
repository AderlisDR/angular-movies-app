import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FavoriteMovieRequest } from '../models/favorite-movie-request';
import { FavoriteMovieResponse } from '../models/favorite-movie-response';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  MEDIA_TYPE = 'movie';

  constructor(private http: HttpClient) { }

  getTopRatedMovies() {
    return this.http.get<Response>(`${environment.apiUrl}3/movie/top_rated?api_key=${environment.apiKey}`).toPromise();
  }

  getFavoriteMovies(accountId: number, sessionId: string) {
    return this.http.get<Response>(`${environment.apiUrl}3/account/${accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${sessionId}`).toPromise();
  }
  
  markAsFavorite(sessionId: string, accountId: number, movieId: number, isFavorite: boolean) {
    const request: FavoriteMovieRequest = {
      favorite: isFavorite,
      media_type: this.MEDIA_TYPE,
      media_id: movieId
    };
    return this.http.post<FavoriteMovieResponse>(`${environment.apiUrl}3/account/${accountId}/favorite?api_key=${environment.apiKey}&session_id=${sessionId}`, request).toPromise();
  }
}
