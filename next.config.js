/** @type {import('next').NextConfig} */
const repo = 'secure-frontend'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
    reactStrictMode: true,
    distDir: 'build',
    assetPrefix: assetPrefix,
    basePath: basePath,
};

module.exports = nextConfig;