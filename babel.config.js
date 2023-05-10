module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'entry',
                'corejs': 3 // 指定 corejs 的版本,如果package.json没有core-js，还需要另外安装
            }
        ]
    ],
    'plugins': [ // 如未用到@babel/plugin-transform-runtime可不配置
        [
            '@babel/plugin-transform-runtime',
            {
                'corejs': 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
            }
        ]
    ]
}
