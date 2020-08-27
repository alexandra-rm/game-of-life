module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
