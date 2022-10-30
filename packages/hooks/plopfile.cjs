module.exports = (plop) => {
  plop.setGenerator('hook', {
    description: 'Create a new hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Gimme yo address, hook... (enter name of hook - ex: useHook )',
        validate: (value) => {
          if (/.+/.test(value)) return true;
          return 'The name is required';
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{camelCase name}}/index.ts',
        templateFile: '.plop/templates/index.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: '.plop/templates/hook.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: '.plop/templates/dom.ts.hbs'
      },
      {
        path: 'src/index.ts',
        pattern: /(\/\/ GENERATED EXPORTS)/g,
        template: "export * from './{{camelCase name}}';\n$1",
        type: 'modify'
      }
    ]
  });
};
