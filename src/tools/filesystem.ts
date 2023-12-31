import { GluegunToolbox, filesystem } from 'gluegun';
import * as pathlib from 'path';

/**
 * A lot like gluegun's filesystem.subdirectories(), but gets files too.
 *
 * This should probably go in Gluegun.
 *
 * Right about right here: https://github.com/infinitered/gluegun/blob/master/src/toolbox/filesystem-tools.ts#L52
 */
export function children(path: string, isRelative = false, matching = '*'): string[] {
  const dirs = filesystem.cwd(path).find({
    matching,
    directories: true,
    recursive: false,
    files: true,
  });
  if (isRelative) {
    return dirs;
  } else {
    return dirs.map((dir) => pathlib.join(path, dir));
  }
}

type CopyBoilerplateOptions = {
  boilerplatePath: string;
  targetPath: string;
  excluded: Array<string>;
};

/**
 * Copies the boilerplate over to the destination folder.
 *
 */
export async function copyBoilerplate(toolbox: GluegunToolbox, options: CopyBoilerplateOptions) {
  const { filesystem } = toolbox;
  const { copyAsync, path } = filesystem;

  // ensure the destination folder exists
  await filesystem.dirAsync(options.targetPath);

  // rather than copying everything wholesale, let's check what's in the boilerplate folder
  // and copy over everything except stuff like lockfiles and node_modules
  // just to make it faster, y'know? Don't want to copy unnecessary stuff
  const filesAndFolders = children(options.boilerplatePath, true);
  const copyTargets = filesAndFolders.filter((file) => !options.excluded.find((exclusion) => file.includes(exclusion)));

  // kick off a bunch of copies
  const copyPromises = copyTargets.map((fileOrFolder) =>
    copyAsync(path(options.boilerplatePath, fileOrFolder), path(options.targetPath, fileOrFolder), {}),
  );

  // copy them all at once
  return Promise.all(copyPromises);
}
