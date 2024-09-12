/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  transformIgnorePatterns: [ "node_modules/(?!axios)" ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ]
};