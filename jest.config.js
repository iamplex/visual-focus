module.exports = {
  rootDir: './',
  setupFiles: ['jest-canvas-mock'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
}
