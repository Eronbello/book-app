module.exports = {
  globals: {
    PATH: "http://192.168.0.14:8080"
  },
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.svg$": "<rootDir>/private/jest/svgMock.js",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },

  moduleNameMapper: {
    "^atoms(.*)$": "<rootDir>/src/components/atoms$1",
    "^molecules(.*)$": "<rootDir>/src/components/molecules$1",
    "^organism(.*)$": "<rootDir>/src/components/organism$1",
    "^templates(.*)$": "<rootDir>/src/components/templates$1",
    "^pages(.*)$": "<rootDir>/src/components/pages$1"
  },

  testMatch: [
    "**/src/**/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  preset: "@vue/cli-plugin-unit-jest"
};
