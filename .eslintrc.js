module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        'semi': [
            'error',
            'never'
        ],
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ]

    }
}
