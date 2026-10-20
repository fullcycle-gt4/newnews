import { Router } from 'express';
import { NewsController } from '../controllers/newsController.js';

export class NewsRouter {
  public router: Router;

  constructor(private readonly newsController: NewsController) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/search', (req, res, next) => this.newsController.searchNews(req, res, next));
    this.router.get('/:id', (req, res, next) => this.newsController.getNewsById(req, res, next));
    this.router.get('/:id/related', (req, res, next) => this.newsController.getRelatedNews(req, res, next));
  }
}