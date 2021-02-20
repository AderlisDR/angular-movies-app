import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorModel } from 'src/app/models/error-model';
import { FavoriteMovieResponse } from 'src/app/models/favorite-movie-response';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnChanges {
  @Input() favoriteMovies!: Movie[];
  @Input() pipe!: any;
  showedDetails = false;
  isLoading = true;

  constructor(private moviesService: MoviesService,
    private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.favoriteMovies.length != 0) this.isLoading = false;
  }

  deleteFromFavorite(movieId: number) {
    const sessionId = this.authService.session.session_id;
    const accountId = this.authService.account.id;
    const movieToDeleteIndex = this.favoriteMovies.findIndex(movie => movie.id == movieId);
    this.favoriteMovies.splice(movieToDeleteIndex, 1);
    this.moviesService.markAsFavorite(sessionId, accountId, movieId, false).then((response: FavoriteMovieResponse) => {
      console.log(response);
    }).catch(error => { 
      this.isLoading = false;
      const errorModel = error.error as ErrorModel;
      this.notificationService.notificationErrorService(errorModel);
    });
  }
}
