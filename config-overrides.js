const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    overrideDevServer,
    addDecoratorsLegacy,
} = require('customize-cra')

const path = require('path')

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/d/': {
                target: 'http://101.254.236.76:11380/',
                changeOrigin: true,
            },
        },
    }
}

module.exports = {
    webpack: override(
        addDecoratorsLegacy(),
        addWebpackAlias({
            '@': path.resolve('src'),
        }),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                    '@font-size-base': '12px',
                    '@font-family': 'sans-serif',
                    '@text-color': '#212529',
                },
            },
        })
    ),
    devServer: overrideDevServer(devServerConfig()),
}
