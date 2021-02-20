
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BestMoviesComponent } from './components/best-movies/best-movies.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { OrderByClassificationPipe } from './pipes/order-by-classification.pipe';
import { OrderByNamePipe } from './pipes/order-by-name.pipe';
import { OrderByDatePipe} from './pipes/order-by-date.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { MainComponent } from './components/main/main.component';
import { SessionComponent } from './components/session/session.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    BestMoviesComponent,
    FavoriteMoviesComponent,
    MovieDetailsComponent,
    OrderByDatePipe,
    OrderByClassificationPipe,
    OrderByNamePipe,
    DynamicPipe,
    MainComponent,
    SessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  exports: [
    DynamicPipe
  ],
  entryComponents: [MovieDetailsComponent],
  providers: [
    OrderByDatePipe,
    OrderByClassificationPipe,
    OrderByNamePipe,
    DynamicPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
