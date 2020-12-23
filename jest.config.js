module.exports = {
    verbose: true,
    transform: {
        '\\.(js|jsx)?$': 'babel-jest', 
    },
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect',
    ] // setupFiles before the tests are ran
}