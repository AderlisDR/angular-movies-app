import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  {
    path: 'main-movies',
    component: MainComponent,
  },
  {
    path: '',
    component: SessionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
