import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'articles',
    loadChildren: () =>
      import('./articles/articles-routing.module').then(
        (m) => m.ArticlesRoutingModule
      ),
  },
  {
    path: 'static',
    loadChildren: () =>
      import('./staticpages/staticpages-routing.module').then(
        (m) => m.StaticpagesRoutingModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./account/account-routing.module').then(
        (m) => m.AccountRoutingModule
      ),
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
