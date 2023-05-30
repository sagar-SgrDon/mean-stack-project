import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleCrudComponent } from '../article-crud/article-crud.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  articles: any;
  constructor(
    private articleService: ArticlesService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.displayArticles();
    this.articleService.subscription =
      this.articleService.invokeDisplayArticles.subscribe(() => {
        this.displayArticles();
      });
  }

  ngOnDestroy(): void {
    this.articleService.subscription.unsubscribe();
  }

  openModal() {
    this.articleService.isAddArticle.next(true);
    this.modalService.open(ArticleCrudComponent);
  }

  displayArticles() {
    this.articleService.getArticles().subscribe((res) => {
      console.log(res);
      this.articles = JSON.parse(JSON.stringify(res)).articles;
      console.log(this.articles);
    });
  }
}
