import { GluegunToolbox } from 'gluegun';
import { command, heading, p } from '../tools/pretty';

module.exports = {
  dashed: true,
  alias: ['h'],
  description: 'Displays create-typescript-boilerplate CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { meta } = toolbox;

    p();
    heading(`Welecome to Create-typescript-boilerplate ${meta.version()}!`);
    p();
    p('Welecome is a CLI that helps you use typescript project');
    p();
    heading('Commands');
    p();
    command('new             ', 'Creates a typescript project', ['create-typescript-boilerplate new MyApp']);
    p();
  },
};
