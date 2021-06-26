module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        createDefaultProgram: true,
      },
      plugins: ['prettier'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
        'prettier',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        'prettier/prettier': [
          1,
          {
            trailingComma: 'all',
            tabWidth: 2,
            semi: true,
            singleQuote: true,
            bracketSpacing: true,
            printWidth: 100,
          },
        ],
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: 'tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
