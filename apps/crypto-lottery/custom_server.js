const { createServer } = require("https")
const { parse } = require("url")
const next = require("next")
const fs = require("fs")
const dev = process.env.NODE_ENV ? process.env.NODE_ENV !== "production" : false
const port = process.env.PORT ? +process.env.PORT : 1234
const app = next({ dev, customServer: true, hostname: "localhost", port })
const handle = app.getRequestHandler()

const httpsOptions = {
	key: fs.readFileSync("./.certificates/constantine_dev.key"),
	cert: fs.readFileSync("./.certificates/constantine_dev.crt"),
}

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true)
		handle(req, res, parsedUrl)
	}).listen(port, err => {
		if (err) throw err
		console.log(`> Server started on https://localhost:${port}`)
	})
})
