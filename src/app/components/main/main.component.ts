import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorModel } from 'src/app/models/error-model';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from '../../../environments/environment';
import { TabsEnum } from '../../enums/tabs.enum';
import { Movie } from '../../models/movie';
import { Response } from '../../models/response';
import { OrderByClassificationPipe } from '../../pipes/order-by-classification.pipe';
import { OrderByDatePipe } from '../../pipes/order-by-date.pipe';
import { OrderByNamePipe } from '../../pipes/order-by-name.pipe';
import { AuthService } from '../../services/auth.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'movie-app';
  movieListBySelectedTab = {
    [TabsEnum.FavoriteTap]: () => this.getFavoriteMovies(),
    [TabsEnum.TopRatedTap]: () => this.getTopRatedMovies()
  };
  defaultTabIndex = TabsEnum.TopRatedTap;
  orderByNamePipe = OrderByNamePipe;
  orderByDatePipe = OrderByDatePipe;
  orderByClassificationPipe = OrderByClassificationPipe;
  pipe: any;
  favoriteMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  orderValueName: string = "Calificación";

  constructor(private authService: AuthService,
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit() {
    const requestToken = this.activatedRoute.snapshot.queryParams.request_token;
    const isApproved = this.activatedRoute.snapshot.queryParams.approved as boolean;
    if (isApproved && requestToken) {
      this.authService.getSession(requestToken).then(() => {
        this.getFavoriteMovies();
        this.getTopRatedMovies();
      }).catch(error => console.log(error));
    }
  }

  matTabChangeEvent(event: any) {
    this.getFavoriteMovies();
    this.getTopRatedMovies();
  }

  getFavoriteMovies() {
    const accountId = this.authService.account.id;
    const sessionId = this.authService.session.session_id;
    this.moviesService.getFavoriteMovies(accountId, sessionId).then((movies: Response) => {
      this.favoriteMovies = movies.results;
      if (this.favoriteMovies.length != 0)
        this.favoriteMovies.map(movie => {
          movie.poster_path = movie.poster_path != null ? `${environment.imageUrl}${movie.poster_path}` : movie.poster_path;
          movie.is_favorite = true;
        });
    }).catch(error => {
      const errorModel = error.error as ErrorModel;
      this.notificationService.notificationErrorService(errorModel);
    });
  }

  getTopRatedMovies() {
    this.moviesService.getTopRatedMovies().then((movies: Response) => {
      this.topRatedMovies = movies.results;
      if (this.topRatedMovies.length != 0)
        this.topRatedMovies.map(movie => {
          movie.poster_path = movie.poster_path != null ? `${environment.imageUrl}${movie.poster_path}` : movie.poster_path;
          movie.is_favorite = this.favoriteMovies.some(favoriteMovie => favoriteMovie.id == movie.id);
        });
    }).catch(error => {
      const errorModel = error.error as ErrorModel;
      this.notificationService.notificationErrorService(errorModel);
    })
  }

  setOrderedValue(orderValue: any) {
    this.pipe = orderValue;
    if (orderValue == this.orderByDatePipe)
      this.orderValueName = "Año de publicación";
    else if (orderValue == this.orderByNamePipe)
      this.orderValueName = "Nombre";
    else this.orderValueName = "Calificación";
  }
}
