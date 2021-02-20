import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'orderByClassification'
})
export class OrderByClassificationPipe implements PipeTransform {

  transform(movies: Movie[]): Movie[] {
    return movies.sort((firstMovie: Movie, secondMovie: Movie) => {
            if (firstMovie.popularity > secondMovie.popularity) {
                return -1;
            } else if (firstMovie.popularity < secondMovie.popularity) {
                return 1;
            } else {
                return 0;
            }
    });
  }
}
