## 安装 eslint-plugin-import

[eslint-plugin-import文档](https://github.com/import-js/eslint-plugin-import#readme 'eslint-plugin-import文档')

    npm install eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript --save-dev

`.eslintrc.cjs`增加配置

    module.exports = {
      extends: [
        ...
        'plugin:import/recommended',
        'plugin:import/typescript',
        ...
      ],
      settings: {
        'import/resolver': {
          typescript: true,
          node: true
        },
        'import/extensions': ['.ts', '.tsx']
      },
      rules: {
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            alphabetize: { order: 'asc' }
          }
        ]
      }
    }
