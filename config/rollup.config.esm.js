const { resolve } = require('path')
const { banner } = require('./rollup')
const { babel } = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')

module.exports = {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: 'dist/index.esm.js',
    format: 'es',
    banner,
  },
  plugins: [
    typescript(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    terser(),
  ]
}