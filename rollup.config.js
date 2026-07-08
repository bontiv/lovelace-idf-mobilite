import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import copy from "rollup-plugin-copy-assets";

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({
    browser: true,
  }),
  commonjs(),
  json(),
  babel({
    exclude: ['node_modules/**', 'src/referentiel-des-lignes-filtered.js'],
    babelHelpers: 'bundled',
  }),
  dev && serve(serveopts),
  !dev && terser(),
  copy({
    assets: [
        'src/images',
    ]
  })
];

export default [
  {
    input: 'src/idf-mobilite.js',
    output: {
      file: 'dist/idf-mobilite.js',
      format: 'es',
      inlineDynamicImports: true,
    },
    plugins: [...plugins],
  },
];