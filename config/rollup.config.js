const { resolve } = require('path')
const { banner } = require('./rollup')
const { babel } = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')

console.log(process.env.NODE_ENV === 'production')

module.exports = {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: resolve(process.cwd(), 'dist/index.js'),
    format: 'cjs',
    banner
  },
  plugins: [
    typescript(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    process.env.NODE_ENV === 'production' ? terser() : undefined,
  ]
}