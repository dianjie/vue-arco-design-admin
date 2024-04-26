# Stylelint

[Stylelint](https://stylelint.io/) 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

## 安装 stylelint 和 stylelint-config-standard

[stylelint-config-standard文档](https://github.com/stylelint/stylelint-config-standard#readme 'stylelint-config-standard文档')

使用 npm 安装 Stylelint 及其 标准配置

    npm install --save-dev stylelint stylelint-config-standard

### 生成 .stylelintrc.json

    echo { "extends": "stylelint-config-standard" } > .stylelintrc.json

## 安装 stylelint-order

[stylelint-order文档](https://github.com/hudochenkov/stylelint-order#readme 'stylelint-order文档')

    npm install stylelint-order --save-dev

### .stylelintrc.json

往 `.stylelintrc.json` 添加配置，最终内容为：

    {
      "extends": "stylelint-config-standard",
      "plugins": ["stylelint-order"],
      "rules": {
        "order/order": [
          "dollar-variables",
          "custom-properties",
          { "type": "at-rule", "hasBlock": false },
          "declarations"
        ]
      }
    }

## 安装 stylelint-config-recommended-vue

[stylelint-config-recommended-vue文档](https://github.com/ota-meshi/stylelint-config-recommended-vue#readme 'stylelint-config-recommended-vue文档')

    npm install --save-dev postcss-html stylelint-config-recommended-vue

### .stylelintrc.json

往 `.stylelintrc.json` 写入配置，最终内容为：

    {
      "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"],
      "plugins": ["stylelint-order"],
      "rules": {
        "order/order": [
          "dollar-variables",
          "custom-properties",
          { "type": "at-rule", "hasBlock": false },
          "declarations"
        ]
      }
    }

## 自定义CSS处理器(修复各种奇奇怪怪的警告)，项目内用到Less

    npm install --save-dev less postcss-less

### .stylelintrc.json

往 `.stylelintrc.json` 写入配置，最终内容为：

    {
      "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"],
      "plugins": ["stylelint-order"],
      "overrides": [
        {
          "files": ["**/*.(css|html|vue)"],
          "customSyntax": "postcss-html"
        },
        {
          "files": ["*.less", "**/*.less"],
          "customSyntax": "postcss-less",
          "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"]
        }
      ],
      "rules": {
        "no-empty-source": null,
        "selector-class-pattern": null,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            "ignorePseudoClasses": ["global", "deep"]
          }
        ],
        "order/order": [
          "dollar-variables",
          "custom-properties",
          { "type": "at-rule", "hasBlock": false },
          "declarations"
        ]
      }
    }
