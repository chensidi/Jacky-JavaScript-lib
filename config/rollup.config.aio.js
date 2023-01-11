const { resolve } = require('path')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { banner } = require('./rollup')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const nodePolyfills = require('rollup-plugin-polyfill-node')
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')

module.exports = {
  input: resolve(__dirname, '../src/index.ts'),
  output: {
    file: 'dist/index.aio.js',
    format: 'umd',
    name: 'jTools',
    banner,
  },
  plugins: [
    typescript(),
    nodeResolve({
    }),
    commonjs(),
    json(),
    nodePolyfills(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    terser(),
  ]
}