import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModel } from 'src/app/models/error-model';
import { FavoriteMovieResponse } from 'src/app/models/favorite-movie-response';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-best-movies',
  templateUrl: './best-movies.component.html',
  styleUrls: ['./best-movies.component.css']
})
export class BestMoviesComponent implements OnChanges {
  @Input() topRatedMovies!: Movie[];
  isLoading = true;
  @Input() pipe!: any;

  constructor(private moviesService: MoviesService,
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.topRatedMovies.length != 0) this.isLoading = false;
  }

  showDetailsModal(movie: Movie) {
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
    });
  }

  changeFavoriteStatus(movie: Movie) {
    const sessionId = this.authService.session.session_id;
    const accountId = this.authService.account.id;
    this.moviesService.markAsFavorite(sessionId, accountId, movie.id, !movie.is_favorite).then((response: FavoriteMovieResponse) => {
      this.topRatedMovies.forEach(topRatedMovie=> {
        if (topRatedMovie.id == movie.id) topRatedMovie.is_favorite = !movie.is_favorite;
      });
      console.log(response);
    }).catch(error => { 
      this.isLoading = false;
      const errorModel = error.error as ErrorModel;
      this.notificationService.notificationErrorService(errorModel);
    });
  }
}
