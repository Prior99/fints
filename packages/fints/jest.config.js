module.exports = {
    runner: "groups",
    collectCoverage: true,
    moduleFileExtensions: ["ts", "js"],
    transform: {
        ".ts": "ts-jest",
    },
    coverageReporters: ["lcov", "text-summary"],
    testMatch: ["**/src/**/__tests__/test-*.ts"],
    globals: {
        "ts-jest": {
            diagnostics: {
                pathRegex: ".*test-.*\\.ts$",
            },
            ignoreCoverageForDecorators: true,
            ignoreCoverageForAllDecorators: true,
        },
    },
    coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
    collectCoverageFrom: ["src/**/*.ts"],
};
