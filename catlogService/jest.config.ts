import type { Config } from 'jest';
const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules"],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
};

export default config;
