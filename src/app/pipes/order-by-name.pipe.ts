import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
  name: 'orderByName'
})
export class OrderByNamePipe implements PipeTransform {

  transform(movies: Movie[]): Movie[] {
    return movies.sort((firstMovie: Movie, secondMovie: Movie) => {
      return firstMovie.title.localeCompare(secondMovie.title);
    });
  }
}
