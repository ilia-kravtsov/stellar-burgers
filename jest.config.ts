import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@auth': '<rootDir>/src/utils/auth.ts',
    '@slices': '<rootDir>/src/services/slices'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/__mockData__/',
    '/__tests__/utils/'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__/utils/',
    'src/utils/'
  ]
};

export default config;
