import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  modulePaths: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  testMatch: [
    "**/**/*.spec.ts"
  ],
  testTimeout: 15000,
};

export default config;
