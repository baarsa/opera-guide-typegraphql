module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/?(*.)+(test).+(ts)"
    ],
    "transform": {
        "^.+\\.(ts)$": "ts-jest"
    },
    "collectCoverageFrom": [
        "<rootDir>/src/**/*.ts",
    ]
};
