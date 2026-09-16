import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  mode: "development",
  target: "node",
  context: __dirname,
  entry: "./ts/main.tsx",
  output: {
    filename: "bundle.mjs",
    path: path.join(__dirname, '../public/js/build'),
    library: { type: "module" }
  },
  experiments: {
    outputModule: true
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '..', 'node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /(node_modules)/,
        loader: "esbuild-loader",
        options: { 
		loader: "tsx",
		target: "es2022",
		tsconfig: './tsconfig.json'
	}
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs"],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs']
    },
    modules: [
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ],
    alias: {
      '@': path.resolve(__dirname, './ts')
    }
  },
  externalsType: "module",
  externals: []
};