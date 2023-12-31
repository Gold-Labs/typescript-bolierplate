/* eslint-disable @typescript-eslint/no-var-requires */
import { build } from 'gluegun';

/**
 * Create the cli and kick it off
 */
async function run(argv: string[]) {
  const cli = build()
    .brand('create-typescript-boilerplate')
    .exclude(['semver', 'http', 'template'])
    .src(__dirname)
    .defaultCommand(require('./commands/help'))
    .create();

  return cli.run(argv);
}

module.exports = { run };
