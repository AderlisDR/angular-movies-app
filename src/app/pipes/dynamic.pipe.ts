import { Type } from '@angular/core';
import { Injector, Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';
import { OrderByClassificationPipe } from './order-by-classification.pipe';

@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {
  constructor(private injector: Injector) { }

  transform(values: Movie[], pipeName: Type<any>): any {
    if (!pipeName)
      pipeName = OrderByClassificationPipe;

    const injector = Injector.create({
      name: 'dynamicPipe',
      parent: this.injector,
      providers: [
        { provide: pipeName }
      ]
    });
    const pipe = injector.get(pipeName);
    return pipe.transform(values);
  }
}