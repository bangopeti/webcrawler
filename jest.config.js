/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: { '^(\\.\\.?\\/.+)\\.js$': '$1' },
  preset: 'ts-jest',
  rootDir: './src',
  testEnvironment: 'node',
};

export default config;
