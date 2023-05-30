import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleCrudComponent } from '../article-crud/article-crud.component';
import { Article } from '../article-interface';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article!: Article;
  artId!: string;
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router,
    private modelService: NgbModal
  ) {}

  ngOnInit() {
    this.displayArticle();
    this.articlesService.subscription =
      this.articlesService.invokeDispSingleArticle.subscribe(() =>
        this.displayArticle()
      );
  }
  ngOnDestroy(): void {
    this.articlesService.subscription.unsubscribe();
  }

  displayArticle() {
    let id;
    this.route.paramMap.subscribe((val) => {
      id = val.get('id');
      // console.log(id);
      if (!id) return;
      this.artId = id;
      this.articlesService.getArticle(this.artId).subscribe((response) => {
        if (response) {
          this.article = JSON.parse(JSON.stringify(response)).article;
          // console.log(this.article);
        }
      });
    });
  }

  deleteArt() {
    this.articlesService.deleteArticle(this.artId).subscribe((response) => {
      if (response) {
        console.log(response);
        this.router.navigate(['/articles']);
      }
    });
  }

  openEditModal() {
    this.articlesService.isAddArticle.next(false);
    this.articlesService.sharedArtId = this.artId;
    this.articlesService.sharedArt = this.article;
    if (this.article) {
      this.modelService.open(ArticleCrudComponent);
    }
  }
}
