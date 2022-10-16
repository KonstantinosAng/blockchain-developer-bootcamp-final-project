/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui"])

module.exports = withTM({
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	basePath: "",
	images: {
		domains: ["avatars.dicebear.com"],
	},
	async headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=1, stale-while-revalidate=59",
					},
				],
			},
		]
	},
	// experimental: { images: { layoutRaw: true } },
	devIndicators: {
		buildActivityPosition: "bottom-right",
	},
	// serverRuntimeConfig: {
	// Will only be available on the server side
	// mySecret: "secret",
	// secondSecret: process.env.SECOND_SECRET, // Pass through env variables
	// },
	// publicRuntimeConfig: {
	// Will be available on both server and client
	// staticFolder: "/static",
	// },
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		// Important: return the modified config
		return config
	},
	/* For docker development */
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		}
		return config
	},
})
