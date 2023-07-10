import stylish from './stylish.js';

const formatSelection = (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown format '${formatName}'!`);
  }
};

export default formatSelection;
