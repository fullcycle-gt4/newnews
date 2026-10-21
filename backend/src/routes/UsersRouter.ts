
import { Router } from 'express';
import { UsersController } from '../controllers/UsersController.js';

export class UsersRouter {
    public readonly router: Router;

    constructor(private readonly usersController: UsersController) {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', (req, res, next) => this.usersController.getUsers(req, res, next));
        this.router.post('/', (req, res, next) => this.usersController.createUser(req, res, next));
    }
}
