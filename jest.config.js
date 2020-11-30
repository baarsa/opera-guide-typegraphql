module.exports = {
    "roots": [
        "<rootDir>/client"
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
        "<rootDir>/client/**/*.{ts,tsx}",
        "!**/types.ts",
    ]
};
