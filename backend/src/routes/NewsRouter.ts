import { Router } from 'express';
import { NewsController } from '../controllers/NewsController.js';

export class NewsRouter {
  public router: Router;

  constructor(private readonly newsController: NewsController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', (req, res, next) => this.newsController.searchNews(req, res, next));
    this.router.get('/search', (req, res, next) => this.newsController.searchNews(req, res, next));
    this.router.get('/:id', (req, res, next) => this.newsController.getNewsById(req, res, next));
    this.router.get('/:id/related', (req, res, next) => this.newsController.getRelatedNews(req, res, next));
  }
}