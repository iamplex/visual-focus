import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',

  output: {
    file: 'dist/focus.js',
    format: 'umd',
    name: 'focus',
  },

  plugins: [terser()],
}
