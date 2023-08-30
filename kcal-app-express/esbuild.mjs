import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  platform: 'node',
  external: ['nock', 'aws-sdk', 'mock-aws-s3', '@mapbox/node-pre-gyp'],
  outfile: 'build/index.js',
});
