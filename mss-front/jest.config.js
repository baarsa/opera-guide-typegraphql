module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/?(*.)+(test).+(ts|tsx)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "moduleNameMapper": {
        "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    },
    "collectCoverageFrom": [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!**/types.ts",
        "!**/apollo-client-setup.ts",
    ]
};
