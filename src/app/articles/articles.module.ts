import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { LatestArticlesComponent } from './latest-articles/latest-articles.component';
import { FeaturedArticlesComponent } from './featured-articles/featured-articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleCrudComponent } from './article-crud/article-crud.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    LatestArticlesComponent,
    FeaturedArticlesComponent,
    CategoriesComponent,
    ArticleCrudComponent,
  ],
  imports: [CommonModule, ArticlesRoutingModule, ReactiveFormsModule],
  exports: [LatestArticlesComponent],
})
export class ArticlesModule {}
