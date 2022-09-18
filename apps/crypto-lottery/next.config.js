/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ui'])

module.exports = withTM({
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // experimental: { images: { layoutRaw: true } },
})
