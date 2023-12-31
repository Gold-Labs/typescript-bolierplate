import { GluegunToolbox } from 'gluegun';
import { error, p, prefix, startSpinner, stopSpinner, warning } from '../tools/pretty';
import { copyBoilerplate } from '../tools/filesystem';

const isWindows = process.platform === 'win32';

module.exports = {
  name: 'new',
  dashed: true,
  alias: ['n', 'create'],
  description: 'Displays typescript-boilerplate CLI help',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, meta, prompt, filesystem, system } = toolbox;
    const { path } = filesystem;
    let packageName = parameters.first;

    const rootPath = path(`${meta.src}`, '..');
    const boilerplatePath = path(rootPath, 'boilerplate');

    // Package Name Validate
    if (!packageName || packageName.length === 0) {
      error('You must provide a valid CLI name.');
      error('Example: typescript-boilerplate new myApp');
      const packageNameResponse = await prompt.ask<{ packageName: string }>(() => ({
        type: 'input',
        name: 'packageName',
        message: '',
        prefix,
      }));
      packageName = packageNameResponse.packageName;
    }

    //File Exist
    if (filesystem.exists(packageName)) {
      p();
      error(`There's already a folder named ${packageName} here.`);
      const answer = await prompt.confirm(`Do you want to overwrite it?`);
      if (answer) {
        filesystem.remove(packageName);
      } else {
        warning('It must have unique packageName');
        return undefined;
      }
    }
    const targetPath = path(packageName);

    await copyBoilerplate(toolbox, {
      boilerplatePath,
      targetPath,
      excluded: ['.vscode', 'node_modules', 'yarn.lock', 'bun.lockb', 'package-lock.json'],
    });

    startSpinner(' Backing everything up in source control');
    try {
      // The separate commands works on Windows, but not Mac OS
      if (isWindows) {
        await system.run('git init');
        await system.run('git add -A');
      } else {
        await system.run(
          `
          \\rm -rf ./.git
          git init;
          git add -A;
        `,
        );
      }
    } catch (e) {
      warning('Unable to commit the initial changes. Please check your git username and email.');
    }
    stopSpinner(' Backing everything up in source control', '🗄');
    return;
  },
};
