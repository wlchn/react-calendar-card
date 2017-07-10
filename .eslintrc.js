module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        },
        ecmaVersion: 2017,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-debugger": "warn",
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn",
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-constant-condition": "off",
        "no-case-declarations": "warn",
        "no-dupe-keys": "off"
    }
};