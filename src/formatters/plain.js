const stringify = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diffs, parentKey = '') => diffs.flatMap((diff) => {
  const key = parentKey ? `${parentKey}.${diff.name}` : diff.name;
  switch (diff.status) {
    case 'added':
      return `Property '${key}' was added with value: ${stringify(diff.value)}`;
    case 'removed':
      return `Property '${key}' was removed`;
    case 'updated':
      return `Property '${key}' was updated. From ${stringify(diff.oldValue)} to ${stringify(diff.value)}`;
    case 'nested':
      return formatPlain(diff.children, key);
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown diff status: ${diff.status}`);
  }
}).join('\n');

export default formatPlain;
