import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const createUserSchema = z.object({
	email: z.string().trim().email(),
	name: z.string().trim().min(1).max(120),
});

export const usersRouter = Router();

usersRouter.get("/", async (_request, response, next) => {
	try {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
		});

		response.json({ data: users });
	} catch (error) {
		next(error);
	}
});

usersRouter.post("/", async (request, response, next) => {
	const result = createUserSchema.safeParse(request.body);

	if (!result.success) {
		response.status(400).json({
			error: "Invalid request body",
			issues: result.error.issues,
		});
		return;
	}

	try {
		const user = await prisma.user.create({ data: result.data });
		response.status(201).json({ data: user });
	} catch (error) {
		next(error);
	}
});
