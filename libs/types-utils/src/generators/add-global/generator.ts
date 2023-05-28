import { execSync } from 'node:child_process';

import { Tree } from 'nx/src/devkit-exports';
import { addTypesPath } from './utils';

/**
 * Modify all tsconfig*.json to add "../../types/*.d.ts" with the
 * objective to have a globals types folder.
 *
 * Uses the unix find command to search the files, so works in *nix like operating systems like linux and macos.
 *
 * @param tree
 * @param schema
 */
export async function addGlobalGenerator(tree: Tree, schema: any) {
  const cmd = `find ${tree.root}/libs ${tree.root}/apps -name tsconfig.\\*.json`;
  const result = execSync(cmd);
  const files = result.toString().split('\n');

  addTypesPath(tree.root, files, false);
}

export default addGlobalGenerator;
