import _ from 'lodash';

const getIndent = (depth, status = 'unchanged', indent = ' ', length = 4) => {
  const signsIndent = status === 'tree' || status === 'unchanged' ? 0 : 2;
  return `\n${indent.repeat(length * depth - signsIndent)}`;
};

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return node;
  }

  return Object.keys(node).map((key) => {
    const value = !_.isObject(node[key]) ? node[key] : `{${stringify(node[key], depth + 1)}${getIndent(depth)}}`;
    return `${getIndent(depth)}${key}: ${value}`;
  }).join('');
};

const stylish = (diff, depth = 1) => {
  const lines = diff.flatMap((node) => {
    const indent = getIndent(depth, node.status);
    const setValue = (value) => (!_.isObject(value) ? value : `{${stringify(value, depth + 1)}${getIndent(depth)}}`);

    switch (node.status) {
      case 'added':
        return `${indent}+ ${node.name}: ${setValue(node.value)}`;
      case 'removed':
        return `${indent}- ${node.name}: ${setValue(node.value)}`;
      case 'unchanged':
        return `${indent}${node.name}: ${setValue(node.value)}`;
      case 'updated':
        return [
          `${indent}- ${node.name}: ${setValue(node.oldValue)}`,
          `${indent}+ ${node.name}: ${setValue(node.value)}`,
        ];
      case 'nested':
        return `${indent}  ${node.name}: {${stylish(node.children, depth + 1)}${getIndent(depth)}}`;
      default:
        throw new Error(`Unknown type: ${node.status}`);
    }
  });

  return lines.join('');
};

export default (object) => `{${stylish(object)}\n}`;
