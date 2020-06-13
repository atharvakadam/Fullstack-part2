module.exports = {
    'parser':'babel-eslint',
    'env': {
        'browser': true,
        'commonjs': true,
        'es2020': true,
        'jest': true,
        'cypress/globals':true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'plugins': [
        'react','jest','cypress'
    ]
    ,
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
