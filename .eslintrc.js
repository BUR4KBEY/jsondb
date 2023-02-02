module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-import'
    ],
    rules: {
        'import/extensions': 0,
        'class-methods-use-this': 0,
        'no-useless-constructor': 0,
        'import/prefer-default-export': 1,
        'import/no-cycle': 0,
        'no-underscore-dangle': 0,
        'no-restricted-syntax': 0,
        'no-param-reassign': 0,
        'max-classes-per-file': 0,
        'import/export': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error']
    }
};
