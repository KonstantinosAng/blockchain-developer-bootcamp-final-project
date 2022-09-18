module.exports = {
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  setupFilesAfterEnv: ["./setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/empty-module.js",
    "\\.(css|less)$": "<rootDir>/empty-module.js",
  },
};
