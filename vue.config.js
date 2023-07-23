const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//     transpileDependencies: true,
//     plugins: [vue({
//         template: {
//             compilerOptions: {
//                 isCustomElement: tag => tag.startsWith('ion-')
//             }
//         }
//     })]
// })

module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => ({
                ...options,
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith('ion-')
                }
            }))
    }
}