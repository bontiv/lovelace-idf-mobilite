import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import url from '@rollup/plugin-url';

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
  url({
    include: ['**/*.png', '**/*.svg'],
    limit: Infinity, // Always inline as base64 data URI
  }),
  nodeResolve({
    browser: true,
  }),
  dev && serve(serveopts),
  !dev && terser(),
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
