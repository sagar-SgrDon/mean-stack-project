import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.css'],
})
export class LatestArticlesComponent implements OnInit {
  articles!: any;
  constructor(private articleService: ArticlesService) {}

  ngOnInit() {
    this.displayLatestArticles();
  }

  displayLatestArticles() {
    this.articleService.getLatestArticles().subscribe((response) => {
      if (response) {
        console.log(response);
        this.articles = JSON.parse(JSON.stringify(response)).articles;
      }
    });
  }
}
