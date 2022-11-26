import path from 'path'
import withBundleAnalyzer from '@next/bundle-analyzer'

// Not using const here because we might overwrite below
let config = {
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ['mjs'],
  webpack: (config, options) => {

    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    // Aliases
    config.resolve.alias.site = path.resolve(`.`)
    config.resolve.alias.components = path.resolve(`./components/`)
    config.resolve.alias.hooks = path.resolve(`./hooks/`)
    config.resolve.alias.words = path.resolve(`./words/`)

    return config
  },
}

// To run the bundle analyzer, run:
// ANALYZE=true yarn build
if (process.env.ANALYZE) config = withBundleAnalyzer(config)(config)

export default config
