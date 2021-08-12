import { name } from './package.json'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace';
import copy from 'rollup-plugin-copy';
import versionInjector from 'rollup-plugin-version-injector';
let fs = require('fs');


let packjson= JSON.parse(fs.readFileSync('package.json', 'utf8'));
let version = packjson.version;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${name}-${version}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `dist/${name}-${version}.cjs.min.js`,
      format: 'cjs',
      plugins: [terser()]
    },
    {
      file: `dist/${name}-${version}.umd.js`,
      format: 'umd',
      name: 'sdk',
    },
    {
      file: `dist/${name}-${version}.umd.min.js`,
      format: 'umd',
      name: 'sdk',
      plugins: [terser()]
    },
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
      name: 'sdk',
    },
    {
      file: `dist/${name}.umd.min.js`,
      format: 'umd',
      name: 'sdk',
      plugins: [terser()]
    },
    {
      file: `umd.min.js`,
      format: 'umd',
      name: 'sdk',
      plugins: [terser()]
    },
  ],
  plugins: [
    versionInjector(),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    json(),
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    copy({
      targets: [
        { src: 'examples-serve', dest: 'dist/examples' },
        { src: 'README.md', dest: 'dist/README.md'},
        { src: 'version.md', dest: 'dist/version.md'}
      ]
    })
  ]
}
