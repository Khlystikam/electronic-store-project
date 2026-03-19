import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// Это принудительно загрузит переменные из .env в process.env
dotenv.config();

export default defineConfig({
	datasource: {
		url: process.env.DATABASE_URL,
	},
	migrations: {
		seed: "tsx prisma/seed.ts",
	},
});
