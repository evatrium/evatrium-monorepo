import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

const moduleNameMapper = pathsToModuleNameMapper(
  {
    '~/*': ['src/*'],
    '@evatrium/*': ['packages/*/src']
  },
  { prefix: '<rootDir>' }
);
export default {
  // roots: ['<rootDir>'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest'
  // },
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // modulePathIgnorePatterns: [
  //   '<rootDir>/test/__fixtures__',
  //   '<rootDir>/node_modules',
  //   '<rootDir>/dist'
  // ],
  // preset: 'ts-jest',
  // modulePaths: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      moduleNameMapper
      // transform: {
      //   '^.+\\.tsx?$': 'ts-jest'
      // },
      // moduleNameMapper: {
      //   '^~/(.*)$': '<rootDir>/src/$1'
      // }
      // setupFiles: ['./src/__tests__/setup.ts'],
    },
    {
      displayName: 'ssr',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
      moduleNameMapper
      // transform: {
      //   '^.+\\.tsx?$': 'ts-jest'
      // },
    }

    // needed for output bundle testing
    // ,{
    //   displayName: 'dom-cjs',
    //   preset: 'ts-jest',
    //   testEnvironment: 'jsdom',
    //   testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
    //   // setupFiles: ['./src/__tests__/setup.ts'],
    //   moduleNameMapper: {
    //     '^../..$': '<rootDir>/cjs'
    //   }
    // },
    // {
    //   displayName: 'dom-package',
    //   preset: 'ts-jest',
    //   testEnvironment: 'jsdom',
    //   testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
    //   // setupFiles: ['./src/__tests__/setup.ts'],
    //   moduleNameMapper: {
    //     '^../..$': '<rootDir>'
    //   }
    // }
  ],
  collectCoverage: false,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['./src/**/*.{ts,js,tsx,jsx}', '!**/__tests__/**', '!**/__docs__/**']
};
