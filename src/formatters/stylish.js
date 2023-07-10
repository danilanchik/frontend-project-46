import _ from 'lodash';

const getIndent = (depth, status = 'unchanged', indent = ' ', length = 4) => {
  const signsIndent = status === 'tree' || status === 'unchanged' ? 0 : 2;
  return `\n${indent.repeat(length * depth - signsIndent)}`;
};

function stringify(node, depth = 1) {
  return Object.keys(node).map((key) => {
    const value = !_.isObject(node[key]) ? node[key] : `{${stringify(node[key], depth + 1)}${getIndent(depth)}}`;
    return `${getIndent(depth)}${key}: ${value}`;
  }).join('');
}

function stylish(object, depth = 1) {
  return object.map(({
    name,
    oldValue,
    status,
    value,
    children,
  }) => {
    const indent = getIndent(depth, status);
    const setValue = (val) => (!_.isObject(val) ? val : `{${stringify(val, depth + 1)}${getIndent(depth)}}`);
    switch (status) {
      case 'nested':
        return `${indent}${name}: {${stylish(children, depth + 1)}${indent}}`;
      case 'added':
        return `${indent}+ ${name}: ${setValue(value)}`;
      case 'updated':
        return `${indent}- ${name}: ${setValue(oldValue)}${indent}+ ${name}: ${setValue(value)}`;
      case 'removed':
        return `${indent}- ${name}: ${setValue(value)}`;
      case 'unchanged':
        return `${indent}${name}: ${setValue(value)}`;
      default:
        return null;
    }
  }).join('');
}

export default (object) => `{${stylish(object)}\n}`;
