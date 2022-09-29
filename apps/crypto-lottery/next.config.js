/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui"])

module.exports = withTM({
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	basePath: "",
	// experimental: { images: { layoutRaw: true } },
	devIndicators: {
		buildActivityPosition: "bottom-right",
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		// Important: return the modified config
		return config
	},
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		}
		return config
	},
})
