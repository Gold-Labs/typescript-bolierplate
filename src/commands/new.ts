import { GluegunFilesystem, GluegunPrompt, GluegunSystem, GluegunToolbox } from 'gluegun';
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
    const userInputName = parameters.first;
    const rootPath = path(`${meta.src}`, '..');
    const boilerplatePath = path(rootPath, 'boilerplate');

    // Package Name Validate
    const packageName = await validateName(userInputName ?? '', prompt);
    const fileExist = await isFileExist(packageName, prompt, filesystem);
    if (fileExist) {
      return undefined;
    }

    const targetPath = path(packageName);
    await copyBoilerplate(toolbox, {
      boilerplatePath,
      targetPath,
      excluded: ['.vscode', 'node_modules', 'yarn.lock', 'bun.lockb', 'package-lock.json'],
    });

    process.chdir(targetPath);
    changePackageJsonName(packageName, filesystem);
    gitInit(system);
    process.exit(0);
  },
};

const validateName = async (name: string, prompt: GluegunPrompt): Promise<string> => {
  if (!name || name.length === 0) {
    error('You must provide a valid CLI name.');
    error('Example: typescript-boilerplate new myApp');
    const packageNameResponse = await prompt.ask<{ packageName: string }>(() => ({
      type: 'input',
      name: 'packageName',
      message: '',
      prefix,
    }));
    return packageNameResponse.packageName;
  }
  return name;
};

const isFileExist = async (name: string, prompt: GluegunPrompt, filesystem: GluegunFilesystem): Promise<boolean> => {
  if (!filesystem.exists(name)) {
    return false;
  }
  p();
  error(`There's already a folder named ${name} here.`);
  const answer = await prompt.confirm(`Do you want to overwrite it?`);
  if (answer) {
    filesystem.remove(name);
    return false;
  }
  warning('It must have unique packageName');
  return true;
};

const changePackageJsonName = async (name: string, filesystem: GluegunFilesystem) => {
  let packageJsonRaw = filesystem.read('package.json');
  if (!packageJsonRaw) {
    error('package.json is not exist');
    return;
  }
  packageJsonRaw = packageJsonRaw.replace(/HelloWorld/g, name).replace(/hello-world/g, name);
  const packageJson = JSON.parse(packageJsonRaw);
  filesystem.write('./package.json', packageJson);
};

const gitInit = async (system: GluegunSystem) => {
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
};
