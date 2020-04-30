import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/focus.js',
      format: 'esm',
    },
    {
      file: 'dist/focus.umd.js',
      format: 'umd',
      name: 'vfocus',
    },
  ],

  plugins: [terser()],
}
