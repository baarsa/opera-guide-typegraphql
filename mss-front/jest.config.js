module.exports = {
    "roots": [
        "<rootDir>/shared"
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
        "<rootDir>/shared/**/*.{ts,tsx}",
        "!**/types.ts",
        "!**/apollo-client-setup.ts",
    ]
};
