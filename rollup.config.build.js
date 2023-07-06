import { name } from './package.json'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: [
    {
      file: `dist/${name}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `dist/${name}.cjs.min.js`,
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: `dist/${name}.umd.js`,
      format: 'umd',
      name: name,
    },
    {
      file: `dist/${name}.umd.min.js`,
      format: 'umd',
      name: name,
      plugins: [terser()]
    },
    {
      file: `dist/${name}.esm.js`,
      format: 'esm',
      name: name,
    },
    {
      file: `dist/${name}.esm.min.js`,
      format: 'esm',
      name: name,
      plugins: [terser()]
    },
  ],
  plugins: [
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    json(),
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ]
}
