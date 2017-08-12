import Vue from 'vue';

export function addItem(state, item) {
  state.items.push(item);
}

export function removeItem(state, itemIndex) {
  state.items.splice(itemIndex, 1);
}

export function modifyItem(state, payload) {
  Vue.set(state.items, payload.id, Object.assign({}, state.items[payload.id], payload.value));
}

export function setStage(state, stage) {
  state.stage = stage;
}

export function clearItemRanks(state) {
  state.items = state.items.map((item) => {
    item.rating = 1000;
    return item;
  });
}
