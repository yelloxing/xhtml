const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    "name": "boundle",
    file: 'dist/xhtml.es5+.js'
  },
  "plugins": [

    // 帮助 Rollup 查找外部模块，然后安装
    rollupPluginNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),

    // 将CommonJS模块转换为 ES2015 供 Rollup 处理
    rollupPluginCommonjs({
      include: "node_modules/**",
      exclude: []
    })

  ]
};