module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                // modify the options...
                options.compilerOptions = {
                    ...options.compilerOptions,
                    isCustomElement: (item) => item.startsWith('ion')
                }
                return options
            })
    }
}
