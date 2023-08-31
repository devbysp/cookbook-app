import esbuild from 'esbuild';
import babel from 'esbuild-plugin-babel';

esbuild.build({
  entryPoints: ['src/index.js'],
  platform: 'node',
  bundle: true,
  outfile: 'build/bundle.js',
  loader: { '.html': 'text' },
  external: ['mock-aws-s3', 'aws-sdk', 'nock', 'node-pre-gyp'],
  plugins: [
    babel({
      filter: /.*js$/,
      presets: ['es2015'],
    }),
  ],
}).catch(() => process.exit(1));
