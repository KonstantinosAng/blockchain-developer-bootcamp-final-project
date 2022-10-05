import { unlinkSync } from "fs"
import { globby } from "globby"

async function removeMigrationsToRunTests() {
	const pages = await globby(["migrations/*.d.ts", "migrations/*.d.ts.map", "migrations/*.js.map", "migrations/*.js"])
	pages.map(page => unlinkSync(page))
}

removeMigrationsToRunTests()
