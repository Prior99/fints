module.exports = {
    runner: "groups",
    collectCoverage: true,
    moduleFileExtensions: ["js", "ts"],
    transform: {
        ".ts": [
            "ts-jest",
            {
                diagnostics: {
                    pathRegex: ".*test-.*\\.ts$",
                },
                ignoreCoverageForDecorators: true,
                ignoreCoverageForAllDecorators: true,
            },
        ],
    },
    coverageReporters: ["lcov", "text-summary"],
    testMatch: ["**/src/**/__tests__/test-*.ts"],
    coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
    collectCoverageFrom: ["src/**/*.ts"],
    preset: "ts-jest",
};
