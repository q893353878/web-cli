const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
    root: true,
    plugins: ['vue'],
    parser: 'vue-eslint-parser',
    // parserOptions: {
    //     parser: 'babel-eslint',
    //     sourceType: 'module'
    // },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
    // it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        // 新增部分
        'prettier/prettier': 'off', // 关闭prettier非必要的提示
        // 原有部分
        'vue/html-self-closing': ['error', { html: { void: 'never', normal: 'any', component: 'any' } }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-parsing-error': [2, { 'invalid-first-character-of-tag-name': false }],
        'vue/name-property-casing': 'off', // [0, "PascalCase"], // 帕斯卡命名法
        'vue/require-default-prop': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/require-prop-types': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-closing-bracket-newline': [0, { singleline: 'never', multiline: 'always' }],
        'vue/no-use-v-if-with-v-for': 'off',
        'vue/no-v-html': 'off',
        'vue/html-indent': 'off',
        'vue/no-side-effects-in-computed-properties': 0,

        'accessor-pairs': 2,
        'arrow-spacing': [2, { before: true, after: true }],
        'block-spacing': [2, 'always'],
        'brace-style': [2, '1tbs', { allowSingleLine: true }], // 代码书写格式验证
        camelcase: [0, { properties: 'always' }], // 属性命名规则可以不使用驼峰命名法
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2, { before: false, after: true }], // 不允许在逗号前面出现空格
        'comma-style': [2, 'last'], // 方数组元素、变量声明等直接需要逗号隔开
        'constructor-super': 2,
        // 'curly': [2, 'multi-line'], // 函数或者条件判断时需要统一使用大括号
        'dot-location': [2, 'property'],
        'eol-last': 2, // 代码间间隔出现一行
        /**
         * 最佳实践
         */
        'default-case': 'error', // switch语句中必须有default条件
        'dot-notation': ['error', { allowKeywords: false }], // 不允许关键字出现在变量中
        eqeqeq: ['error', 'always', { null: 'ignore' }], // 消除不安全类型的全等操作
        'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
        'generator-star-spacing': [2, { before: true, after: true }],
        'guard-for-in': 'error', // for循环中过滤掉一下不被需要的行为
        'handle-callback-err': [2, '^(err|error)$'], // 处理错误的回调函数
        indent: 'off', // 每行缩进不校验
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [2, { beforeColon: false, afterColon: true }], // 键和值前保留一个空格
        'keyword-spacing': [2, { before: true, after: true }], // 确保字符前后空格的一致性
        'new-cap': [2, { newIsCap: true, capIsNew: false }], // 构造函数首字母需要大写
        'new-parens': 2, // 没有参数时，构造函数也需要添加括号
        'no-array-constructor': 2,
        'no-class-assign': 2,

        'no-case-declarations': 2, // 不允许在 case 子句中使用词法声明
        'no-empty-function': 2, // 禁止出现空函数
        'no-empty-pattern': 2, // 禁止使用空解构模式
        'no-eval': 2, // 禁用 eval()
        'no-global-assign': 2, // 禁止对原生对象或只读的全局对象进行赋值
        // "no-magic-numbers": ["error", { "ignoreArrayIndexes": true }], // 禁用魔术数字
        'no-redeclare': [2, { builtinGlobals: true }], // 禁止重新声明变量
        'no-self-assign': [2, { props: true }], // 禁止自我赋值
        'no-unused-labels': 2, // 禁用出现未使用过的标
        'no-useless-escape': 2, // 禁用不必要的转义字符
        radix: 2, // 强制在parseInt()使用基数参数

        /**
         * 变量声明
         */
        'no-delete-var': 2, // 禁止删除变量
        'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        'no-undef-init': 2,

        'no-unused-vars': [2, { vars: 'all', args: 'none' }], // 禁止出现未使用过的变量
        'no-use-before-define': 2, // 禁止在变量定义之前使用它们
        /**
         * 代码中可能的错误或逻辑错误
         */
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 2, // 禁止在正则表达式中使用控制字符
        'no-console': 'off',
        'no-constant-condition': ['error', { checkLoops: true }], // 禁止在条件中使用常量表达式
        'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
        'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
        'no-duplicate-case': 2, // 禁止出现重复的 case 标签
        'no-empty-character-class': ['error'], // 禁止在正则表达式中使用空字符集
        'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
        'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
        'no-extra-semi': 2, // 禁止不必要的分号
        'no-func-assign': 1, // 禁止对 function 声明重新赋值
        'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现变量声明或 function 声明
        'no-invalid-regexp': [2, { allowConstructorFlags: [] }], // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
        'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白
        'no-obj-calls': 2, // 禁止把全局对象作为函数调用
        'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
        'no-sparse-arrays': 2, // 禁用稀疏数组
        'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
        'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
        'no-unsafe-negation': 2, // 禁止对关系运算符的左操作数使用否定操作符
        'use-isnan': 2, // 要求使用 isNaN() 检查 NaN

        'no-dupe-class-members': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-implied-eval': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [2, { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2, // 不允许键和值之间存在多个空格
        'no-multi-str': 2,
        'no-multiple-empty-lines': [2, { max: 1 }],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2, // 不允许new require出现
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2, // 不允许路径以_链接
        'no-proto': 2,
        'no-return-assign': [2, 'except-parens'], // 不允许在return语句中任务
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2, // 调用函数时，函数名和括号之间不能有空格
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 2, // 不允许在语句后存在多余的空格
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [2, { defaultAssignment: false }],
        'no-unreachable': 2,

        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [2, { initialized: 'never' }],
        'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],
        'padded-blocks': [2, 'never'],
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }], // 使用单引号
        semi: 0, // 每行结尾分号，可有可无
        'semi-spacing': [2, { before: false, after: true }], // 分号前后不能有空格
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }], // 不允许函数括号之间存在空格
        'space-in-parens': [2, 'never'], // 不允许在括号里面存在空格
        'space-infix-ops': 2, // 插入符合变量之间需要添加一个空格
        'space-unary-ops': [2, { words: true, nonwords: false }], // 允许一元运算符操作
        'spaced-comment': [
            2,
            'always',
            { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }
        ], // 注释前需要空行，注释后不需要空行
        'template-curly-spacing': [2, 'never'],
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'], // 条件语句中，变量在赋值语句的前面
        'prefer-const': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'array-bracket-spacing': [2, 'never']
    },
    globals: {
        sysConfig: true,
        AMap: true,
        AMapUI: true
    }
})
