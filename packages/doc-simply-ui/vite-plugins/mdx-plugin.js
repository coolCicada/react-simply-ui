import fs from 'fs';
import path from 'path';
import {
  visit
} from 'unist-util-visit';

let cnt = 1;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1) + String(cnt++);
}

export default function mdxPlugin() {
  return (tree, file) => {

    const codeBlockNode = {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: 'CodeBlock'
        },
      }],
      source: {
        type: 'Literal',
        value: '@/components/CodeBlock',
      },
    };

    const selfImports = [];
    selfImports.push(codeBlockNode);

    const mdxjsEsmModule = {
      type: 'mdxjsEsm',
      data: {
        estree: {
          "type": "Program",
          body: selfImports
        }
      }
    }
    tree.children.unshift(mdxjsEsmModule);

    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'code') {
        const srcAttr = node.attributes.find(attr => attr.name === 'src');
        if (srcAttr) {
          const fileName = path.basename(srcAttr.value, path.extname(srcAttr.value));
          const componentName = capitalizeFirstLetter(fileName);
          const absolutePath = path.resolve(file?.dirname, srcAttr.value);
          const codeContent = fs.readFileSync(absolutePath, 'utf8');

          // 修改节点为自定义组件
          node.name = 'div';

          const cNode = {
            type: 'mdxJsxFlowElement',
            name: componentName
          }
          const textShow = {
            type: 'mdxJsxFlowElement',
            name: 'CodeBlock',
            children: [{
              type: 'mdxJsxFlowElement',
              type: 'pre',
              value: codeContent
            }]
          }

          node.children = [
            cNode,
            textShow
          ]
            // 修改数据中的 AST
            selfImports.push({
              type: 'ImportDeclaration',
              specifiers: [{
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: componentName
                },
              }],
              source: {
                type: 'Literal',
                value: `${srcAttr.value}`
              },
            });

        }
      }
    });

  };
}