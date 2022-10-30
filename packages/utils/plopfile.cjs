module.exports = (plop) => {
  plop.setGenerator('util', {
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
        path: 'src/{{camelCase name}}/index.ts',
        templateFile: '.plop/templates/index.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: '.plop/templates/util.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.test.ts',
        templateFile: '.plop/templates/test.ts.hbs'
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
