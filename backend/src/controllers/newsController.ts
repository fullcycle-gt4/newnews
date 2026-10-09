import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { getCache, setCache } from "../lib/redis.js";

async function getNewsById(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const id = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id;
	if (!id) {
		response.status(400).json({ success: false, error: "ID inválido" });
		return;
	}

	const cacheKey = `news:${id}`;

	try {
		// 1. Check cache (Article cache hit?)
		const cachedNews = await getCache(cacheKey);
		if (cachedNews) {
			response.setHeader("X-Cache", "HIT");
			response.json({ success: true, data: cachedNews });
			return;
		}

		// 2. On cache miss, fetch from database
		const news = await prisma.news.findUnique({ where: { id } });

		if (!news) {
			response.status(404).json({ success: false, error: "Notícia não encontrada" });
			return;
		}

		// 3. Save to cache with a 5-minute TTL (300s)
		await setCache(cacheKey, news, 300);

		response.setHeader("X-Cache", "MISS");
		response.json({ success: true, data: news });
	} catch (error) {
		next(error);
	}
}

export const newsController = {
	getNewsById,
};
