const path = require('path');

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
    ],

    plugins: ['prettier'],

    globals: {
        BASE_PATH: '.',
        SRC_PATH: './src',
    },

    env: {
        browser: true,
    },

    rules: {
        'no-shadow': 'off',
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-plusplus': 'off',
        'guard-for-in': 'off',
        'no-func-assign': 'off',
        'no-fallthrough': 'off',
        'global-require': 'off',
        'no-return-assign': 'off',
        'no-param-reassign': 'off',
        'no-restricted-syntax': 'off',
        'react/no-this-in-sfc': 'off',
        'no-underscore-dangle': 'off',
        'no-prototype-builtins': 'off',
        'react/no-array-index-key': 'off',
        'import/no-named-as-default': 'off',
        'css-modules/no-unused-class': 'off',
        'import/prefer-default-export': 'off',
        'jsx-a11y/interactive-supports-focus': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        // 'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],

        'import/order': ['warn', {
            groups: [
                ['builtin', 'external'],
                ['internal', 'parent'],
                ['sibling', 'index'],
            ],
            'newlines-between': 'ignore',
        }],

        // Recommend not to leave any console.log in your code
        // Use console.error, console.warn and console.info instead
        // https://eslint.org/docs/rules/no-console
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],

        // Prefer destructuring from arrays and objects
        // http://eslint.org/docs/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // Ensure <a> tags are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
                aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
        ],

        // Allow .js files to use JSX syntax
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

        // Functional and class components are equivalent from React’s point of view
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': 'off',

        // ESLint plugin for prettier formatting
        // https://github.com/prettier/eslint-plugin-prettier
        'prettier/prettier': 'error',
    },
};