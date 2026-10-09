import { Redis } from "ioredis";
import { env } from "../config/env.js";

export const redis = new Redis(env.REDIS_URL, {
	lazyConnect: true,
	maxRetriesPerRequest: 1,
	retryStrategy: (times) => Math.min(times * 100, 3000),
});

redis.on("error", () => {
	// Suppress unhandled errors so process won't crash if Redis is unavailable
});

export async function getCache<T>(key: string): Promise<T | null> {
	try {
		const raw = await redis.get(key);
		if (!raw) return null;
		return JSON.parse(raw) as T;
	} catch {
		return null;
	}
}

export async function setCache(
	key: string,
	value: unknown,
	ttlSeconds = 300
): Promise<void> {
	try {
		await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
	} catch {
		// Cache failures are non-blocking
	}
}
