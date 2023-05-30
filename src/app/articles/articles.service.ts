import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from './article-interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  isAddArticle = new BehaviorSubject<boolean>(true);
  sharedArt!: any;
  sharedArtId!: string;
  invokeDisplayArticles = new EventEmitter();
  invokeDispSingleArticle = new EventEmitter();
  subscription!: Subscription;

  url = 'http://localhost:8000/articles';
  constructor(private http: HttpClient) {}

  onDisplayArticles() {
    this.invokeDisplayArticles.emit();
  }

  onDispSingleArt() {
    this.invokeDispSingleArticle.emit();
  }

  getArticles() {
    return this.http.get(this.url);
  }

  getLatestArticles() {
    return this.http.get(this.url + '/latest');
  }

  getArticle(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  createArticle(data: Article) {
    return this.http.post(this.url, data);
  }

  deleteArticle(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  updateArticle(id: string, data: Article) {
    return this.http.patch(this.url + '/' + id, data);
  }
}
