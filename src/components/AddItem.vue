<template>
  <b-input-group class="add-item">
    <input
      type="text"
      v-model="itemName"
      class="form-control add-item-input"
      placeholder="New item..."
      @keyup.enter="addItem"
    ></input>

    <b-input-group-button slot="right">
      <b-button
        class="add-item-button"
        variant="primary"
        size="md"
        @click="addItem"
      >+</b-button>
    </b-input-group-button>
  </b-input-group>
</template>

<script>
export default {
  name: 'AddItem',
  data: () => ({
    itemName: '',
  }),
  methods: {
    addItem() {
      if (this.itemName) {
        this.$store.commit('addItem', {
          text: this.itemName,
          rating: 1000,
          created: Date.now(),
        });
        this.itemName = '';
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.add-item
  width: 100%
  display: flex

.add-item-button
  font-size: 30px
  padding-top: 0
  padding-bottom: 0
</style>
