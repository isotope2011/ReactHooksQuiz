const esModules = ['@hookform'].join('|');

module.exports = {
    verbose: true,
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    modulePaths: [
        '<rootDir>',
        '<rootDir/>/src/'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    transform: {
        "^.+\\.(js|jsx)$": 'babel-jest',
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    setupFilesAfterEnv: [
        './src/setupTests.js',
    ] // setupFiles before the tests are ran
}