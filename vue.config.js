const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    compilerOptions: {
        isCustomElement: (tag) => tag === 'ion-icon'
    }
})
