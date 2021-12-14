module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["tests/billboard_jest.ts", "tests/declarations.d.ts", "tests/index.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "jest-puppeteer",
};
