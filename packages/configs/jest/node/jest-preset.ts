export default {
  roots: ['<rootDir>'],
  // moduleDirectories: ['node_modules', '../utils'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__fixtures__',
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
};
