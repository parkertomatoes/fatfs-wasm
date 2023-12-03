/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'ff\\.wasm$': '<rootDir>/test/fatfsImport.js'
  }
};