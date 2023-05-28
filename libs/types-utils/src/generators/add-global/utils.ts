import * as fs from 'fs';

export function addTypesPath(
  root: string,
  files: string[],
  dryRun = true
): void {
  files.forEach((a) => {
    console.log(`processing ${a}`);
    if (!fs.existsSync(a)) return;
    const data = fs.readFileSync(a);
    const config = JSON.parse(data.toString());

    if (!Array.isArray(config.include)) {
      console.log(`invalid file ${a}, no include property found, skipping`);
      return;
    }
    const newlib = dotsToRoot(root, a);
    if (config.include.find((s) => s === newlib)) {
      console.log(`${a} already has the value, skipping`);
      return;
    }
    config.include.push(newlib);
    if (!dryRun) fs.writeFileSync(a, JSON.stringify(config));
  });

  console.log(`Done, modified ${files.length} files`);
}

export function dotsToRoot(root: string, fName: string) {
  const relative = fName.replace(root, '').replace(/^\//, '');
  const parts = relative.split('/');
  return '../'.repeat(parts.length - 1) + 'types/*.d.ts';
}
