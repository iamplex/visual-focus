import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/v-focus.js',
      format: 'esm',
    },
    {
      file: 'dist/v-focus.umd.js',
      format: 'umd',
      name: 'vfocus',
    },
  ],

  plugins: [terser()],
}
