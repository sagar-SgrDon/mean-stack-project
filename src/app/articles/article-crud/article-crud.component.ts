import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from '../articles.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-article-crud',
  templateUrl: './article-crud.component.html',
  styleUrls: ['./article-crud.component.css'],
})
export class ArticleCrudComponent implements OnInit {
  articleForm!: FormGroup;
  isAddArt: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.articleService.isAddArticle.pipe(take(1)).subscribe((value) => {
      this.isAddArt = value;
    });
    this.setFormState();
  }

  setFormState() {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });

    if (!this.isAddArt) {
      const article = this.articleService.sharedArt;
      console.log(article.title);
      this.articleForm.patchValue({
        title: article.title,
        author: article.author,
        description: article.description,
        imageUrl: article.imageUrl,
      });
    }
  }

  get title() {
    return this.articleForm.get('title');
  }
  get author() {
    return this.articleForm.get('author');
  }
  get description() {
    return this.articleForm.get('description');
  }
  get imageUrl() {
    return this.articleForm.get('imageUrl');
  }

  addArticle() {    
    this.articleService.isAddArticle.next(true);
    this.articleService
      .createArticle(this.articleForm.value)
      .subscribe((response) => {
        if (response) {
          setTimeout(() => {
            this.articleForm.reset();
            console.log(response);
            this.activeModal.close();
            this.articleService.onDisplayArticles();
          }, 1500);
        }
      });
  }

  editArticle() {
    const id = this.articleService.sharedArtId;
    this.articleService
      .updateArticle(id, this.articleForm.value)
      .subscribe((response) => {
        if (response) {
          setTimeout(() => {
            this.articleForm.reset();
            console.log(response);
            this.activeModal.close();
            this.articleService.onDispSingleArt();
          }, 1500);
        }
      });
  }
}
