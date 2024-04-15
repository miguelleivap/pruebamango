module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ["/.next/", "/node_modules/"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  }
};