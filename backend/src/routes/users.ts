
import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

export class UsersRouter {
    public readonly router: Router;

    constructor(private readonly userController: UserController) {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', (req, res, next) => this.userController.getUsers(req, res, next));
        this.router.post('/', (req, res, next) => this.userController.createUser(req, res, next));
    }
}
