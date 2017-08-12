import shuffle from 'lodash.shuffle';

export function itemCount(state) {
  return state.items.length;
}

export function sortedItems(state, { item }) {
  const itemIndexes = Array.from(state.items.keys());
  return itemIndexes.sort((a, b) => {
    const itemA = item(a);
    const itemB = item(b);
    return itemB.rating - itemA.rating || itemA.created - itemB.created;
  });
}

export const getComparisonTable = state => () => {
  const pairs = [];
  for (let a = 0; a < state.items.length; a += 1) {
    for (let b = a + 1; b < state.items.length; b += 1) {
      pairs.push(Math.random() >= 0.5 ? [a, b] : [b, a]);
    }
  }
  return shuffle(pairs);
};

export const item = state => id => state.items[id];
