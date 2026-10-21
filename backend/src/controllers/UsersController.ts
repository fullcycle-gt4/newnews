import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../lib/prisma.js';

const createUserSchema = z.object({
    email: z.string().trim().email(),
    name: z.string().trim().min(1).max(120),
});

export class UsersController {
    constructor(private readonly prisma: PrismaService) {}

    async getUsers(
        _request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const users = await this.prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
            });

            response.json({ data: users });
        } catch (error) {
            next(error);
        }
    }

    async createUser(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        const result = createUserSchema.safeParse(request.body);

        if (!result.success) {
            response.status(400).json({
                error: 'Invalid request body',
                issues: result.error.issues,
            });
            return;
        }

        try {
            const user = await this.prisma.user.create({
                data: result.data,
            });

            response.status(201).json({ data: user });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                response.status(409).json({ error: 'Email já cadastrado' });
                return;
            }
            next(error);
        }
    }
}