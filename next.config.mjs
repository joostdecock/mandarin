import path from 'path'

export default {
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
