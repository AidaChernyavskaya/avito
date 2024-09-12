/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    "^.+.svg?$": "jest-transform-stub"
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  }
};