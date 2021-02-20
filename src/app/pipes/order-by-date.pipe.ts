import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
    name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

    transform(movies: Movie[]): Movie[] {
        return movies.sort((firstMovie: Movie, secondMovie: Movie) => {
            let firstMovieDate = new Date(firstMovie.release_date);
            let secondMovieDate = new Date(secondMovie.release_date);

            if (firstMovieDate > secondMovieDate) {
                return -1;
            } else if (firstMovieDate < secondMovieDate) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}
