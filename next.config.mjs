import path from 'path'
import withBundleAnalyzer from '@next/bundle-analyzer'

// Not using const here because we might overwrite below
let config = {
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ['mjs'],
  webpack: (config, options) => {
    // Fixes npm packages that depend on node modules
    if (!options.isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.path = false
    }

    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    // Aliases
    config.resolve.alias.site = path.resolve(`.`)
    config.resolve.alias.components = path.resolve(`./components/`)
    config.resolve.alias.hooks = path.resolve(`./hooks/`)
    config.resolve.alias.scripts = path.resolve(`./scripts/`)
    config.resolve.alias.prebuild = path.resolve(`./prebuild/`)

    return config
  },
}

// To run the bundle analyzer, run:
// ANALYZE=true yarn build
if (process.env.ANALYZE) config = withBundleAnalyzer(config)(config)

export default config
