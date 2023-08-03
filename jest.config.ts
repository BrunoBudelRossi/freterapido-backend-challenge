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
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@interface/(.*)$': '<rootDir>/src/interface/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
};

export default config;
