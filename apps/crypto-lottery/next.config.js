/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui"])

module.exports = withTM({
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	swcMinify: true,
	compress: true,
	// experimental: { images: { layoutRaw: true } },
	// webpackDevMiddleware: config => {
	// 	config.watchOptions = {
	// 		poll: 1000,
	// 		aggregateTimeout: 300,
	// 	}
	// 	return config
	// },
})
