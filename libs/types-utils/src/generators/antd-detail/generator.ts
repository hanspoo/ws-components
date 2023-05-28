import * as fs from 'fs';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DetailComponentGeneratorSchema } from './schema';

type ClassMeta = {
  name: string;
  fields: string[];
};

export async function detailComponentGenerator(
  tree: Tree,
  options: DetailComponentGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;
  const data = fs.readFileSync(options.name);

  const clases: Array<ClassMeta> = [];
  const chars = data.toString('utf-8');
  let insideClass = false;
  chars.split('\n').forEach((line) => {
    const match = /(class|interface) (\w+)/.exec(line);
    if (match) {
      clases.push({ name: match[2], fields: [] });
      insideClass = true;
    } else {
      if (insideClass) {
        const fieldMatch = /^\s*(\w+): (.*);/.exec(line);
        if (fieldMatch) clases[clases.length - 1].fields.push(fieldMatch[1]);
        if (/.*\}.*/.exec(line)) {
          insideClass = false;
        }
      }
    }
  });

  clases.forEach(({ name, fields }) => {
    const fieldsData = fields
      .map(
        (field) =>
          `     <Item label="${field}">{${name.toLowerCase()}.${field}}</Item>`
      )
      .join('\n');

    console.log(
      `  
import React, { useState } from 'react';
import { Descriptions } from 'antd';

const { Item } = Descriptions;

type ${name}DetailProps =  { 
    ${name.toLowerCase()}: ${name} 
  }

    
function ${name}Detail({ ${name.toLowerCase()} }: ${name}DetailProps ) {

return <Descriptions bordered  title="${name}" column={1} >
${fieldsData}
</Descriptions>

}    

export { ${name}Detail }

    `
    );
  });

  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default detailComponentGenerator;
