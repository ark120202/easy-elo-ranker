export function save({ state }) {
  localStorage.easyEloRankerItems = JSON.stringify(Object.values(state.items));
}

export function load({ commit }) {
  const storedString = localStorage.easyEloRankerItems;
  if (storedString) {
    try {
      const storedValues = JSON.parse(storedString);
      storedValues.forEach(item => commit('addItem', item));
    } catch (err) { /**/ }
  }
}
