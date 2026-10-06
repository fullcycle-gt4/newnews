import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is required to run the seed");
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

const users = [
	{
		email: "ana.silva@newnews.com",
		name: "Ana Silva",
	},
	{
		email: "bruno.santos@newnews.com",
		name: "Bruno Santos",
	},
	{
		email: "carla.oliveira@newnews.com",
		name: "Carla Oliveira",
	},
];

try {
	for (const user of users) {
		await prisma.user.upsert({
			where: { email: user.email },
			update: { name: user.name },
			create: user,
		});
	}

	console.log(`Seed concluído: ${users.length} usuários processados.`);
} finally {
	await prisma.$disconnect();
}
