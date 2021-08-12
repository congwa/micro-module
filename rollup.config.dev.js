import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: [
    {
      file: `examples/dev.js`,
      format: 'umd',
      name: 'micro-module',
    },
  ],
  plugins: [
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    json(),
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    livereload(),
    serve({
      open: true,
      port: 8090,
      contentBase: '',
    })
  ]
}
