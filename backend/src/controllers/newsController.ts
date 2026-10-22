// backend/src/controllers/newsController.ts
import { NextFunction, Request, Response } from 'express';
import { prisma, cache } from '../container.js';
import { newsQuerySchema, relatedNewsSchema, NewsListPayload } from '../models/NewsModel.js';

export class NewsController {
    async searchNews(request: Request, response: Response, next: NextFunction): Promise<void> {
        const result = newsQuerySchema.safeParse(request.query);

        if (!result.success) {
            response.status(400).json({
                error: 'Invalid query parameters',
                issues: result.error.issues,
            });
            return;
        }

        const { query, page, limit } = result.data;
        const where = query
            ? {
                OR: [
                    { title: { contains: query } },
                    { summary: { contains: query } },
                    { content: { contains: query } },
                ],
            }
            : undefined;

        const cacheKey = `news:list:${encodeURIComponent(query?.toLowerCase() || 'all')}:page:${page}:limit:${limit}`;

        try {
            const cachedData = await cache.get<any>(cacheKey);
            if (cachedData) {
                response.status(200).json({
                    source: 'cache',
                    ...cachedData,
                });
                return;
            }

            const [news, totalItems] = await Promise.all([
                prisma.news.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    where,
                    orderBy: {
                        published_at: 'desc',
                    },
                }),
                prisma.news.count({ where }),
            ]);

            const responsePayload: NewsListPayload = {
                type: query ? 'search' : 'all',
                query: query || null,
                pagination: {
                    page,
                    limit,
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                },
                data: news,
            };

            await cache.set(cacheKey, responsePayload, 180);

            response.status(200).json({
                source: 'database',
                ...responsePayload,
            });
        } catch (error) {
            next(error);
        }
    }

    async getNewsById(request: Request, response: Response, next: NextFunction): Promise<void> {
        const id = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
        if (!id) {
            response.status(400).json({ success: false, error: 'ID inválido' });
            return;
        }

        const cacheKey = `news:${id}`;

        try {
            const cachedNews = await cache.get(cacheKey);
            if (cachedNews) {
                response.setHeader('X-Cache', 'HIT');
                response.json({ success: true, data: cachedNews });
                return;
            }

            const news = await prisma.news.findUnique({ where: { id } });

            if (!news) {
                response.status(404).json({ success: false, error: 'Notícia não encontrada' });
                return;
            }

            await cache.set(cacheKey, news, 300);

            response.setHeader('X-Cache', 'MISS');
            response.json({ success: true, data: news });
        } catch (error) {
            next(error);
        }
    }

    async getRelatedNews(request: Request, response: Response, next: NextFunction): Promise<void> {
        const result = relatedNewsSchema.safeParse({
            params: request.params,
            query: request.query,
        });

        if (!result.success) {
            response.status(400).json({
                error: 'Invalid parameters',
                issues: result.error.issues,
            });
            return;
        }

        const { id } = result.data.params;
        const { limit } = result.data.query;

        const cacheKey = `news:${id}:related:limit:${limit}`;

        try {
            const cachedData = await cache.get<any>(cacheKey);
            if (cachedData) {
                response.setHeader('X-Cache', 'HIT');
                response.status(200).json({
                    success: true,
                    data: {
                        news: cachedData,
                    },
                });
                return;
            }

            const currentNews = await prisma.news.findUnique({
                where: { id },
                select: { id: true, category_id: true },
            });

            if (!currentNews) {
                response.status(404).json({
                    success: false,
                    error: 'Notícia não encontrada',
                });
                return;
            }

            const relatedNews = await prisma.news.findMany({
                where: {
                    category_id: currentNews.category_id,
                    id: { not: currentNews.id },
                },
                take: limit,
                orderBy: {
                    published_at: 'desc',
                },
                select: {
                    id: true,
                    title: true,
                    summary: true,
                    image_url: true,
                    published_at: true,
                },
            });

            await cache.set(cacheKey, relatedNews, 300);

            response.setHeader('X-Cache', 'MISS');
            response.status(200).json({
                success: true,
                data: {
                    news: relatedNews,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}