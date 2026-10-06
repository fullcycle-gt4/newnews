import express, { type ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import indexRouter from "./routes/index.js";
import { healthRouter } from "./routes/health.js";
import { usersRouter } from "./routes/users.js";

export const app = express();

app.use(express.json({ limit: "1mb" }));
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/health", healthRouter);

app.use((_request, response) => {
	response.status(404).json({ error: "Not found" });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
	if (error instanceof ZodError) {
		response.status(400).json({
			error: "Invalid request",
			issues: error.issues,
		});
		return;
	}

	console.error(error);
	response.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);
