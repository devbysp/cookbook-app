import esbuild from 'esbuild';
import babel from 'esbuild-plugin-babel';

esbuild.build({
  entryPoints: ['src/index.js'],
  platform: 'node',
  bundle: true,
  outfile: 'build/bundle.js',
  plugins: [
    babel({
      presets: ['es2015'],
    }),
  ],
}).catch(() => process.exit(1));
