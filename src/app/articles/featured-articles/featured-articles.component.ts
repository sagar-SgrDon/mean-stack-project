import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../article-interface';

@Component({
  selector: 'app-featured-articles',
  templateUrl: './featured-articles.component.html',
  styleUrls: ['./featured-articles.component.css'],
})
export class FeaturedArticlesComponent implements OnInit {
  articles!: any;
  constructor(private articleService: ArticlesService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((response) => {
      if (response) {
        this.articles = JSON.parse(JSON.stringify(response)).articles;
      }
    });
  }
}
