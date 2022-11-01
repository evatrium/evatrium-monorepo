module.exports = (plop) => {
  plop.setGenerator('App boilerplate SPA', {
    description: 'Create a new app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'enter name of the app',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'The name is required';
        }
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: './apps/{{camelCase name}}',
        base:'.plop/templates/boilerplateSPA',
        templateFiles: '.plop/templates/boilerplateSPA/**/*',
      }
    ]
  });
  plop.setGenerator('Hook', {
    description: 'Create a new hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'enter name of hook - ex: useHook',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'The name is required';
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/hooks/src/{{camelCase name}}/index.ts',
        templateFile: '.plop/templates/hooks/index.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/hooks/src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: '.plop/templates/hooks/hook.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/hooks/src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: '.plop/templates/hooks/test.ts.hbs'
      },
      {
        path: 'packages/hooks/src/index.ts',
        pattern: /(\/\/ GENERATED EXPORTS)/g,
        template: "export * from './{{camelCase name}}';\n$1",
        type: 'modify'
      }
    ]
  });
  plop.setGenerator('Util', {
    description: 'Create a new util',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the utility?',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'The name is required';
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/utils/src/{{camelCase name}}/index.ts',
        templateFile: '.plop/templates/utils/index.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/utils/src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: '.plop/templates/utils/util.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/utils/src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: '.plop/templates/utils/test.ts.hbs'
      },
      {
        path: 'packages/utils/src/index.ts',
        pattern: /(\/\/ GENERATED EXPORTS)/g,
        template: "export * from './{{camelCase name}}';\n$1",
        type: 'modify'
      }
    ]
  });
};
