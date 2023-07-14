import stylish from './stylish.js';
import plain from './plain.js';

const formatSelection = (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unknown format '${formatName}'!`);
  }
};

export default formatSelection;
