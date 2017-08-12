<template>
  <b-list-group-item class="list-item">
    <b-input-group v-if="edit" class="list-item-main-content">
      <input
        class="list-item-edit-input form-control"
        ref="list-item-edit-input"
        v-model="newValue"
        @keyup.esc="editCancel"
        @keyup.enter.prevent="editSave"
      >
      <b-input-group-button slot="right">
        <b-button
          variant="outline-warning"
          size="sm"
          @click="editCancel"
        >👎</b-button>
      </b-input-group-button>
      <b-input-group-button slot="right">
        <b-button
          variant="outline-success"
          size="sm"
          @click="editSave"
        >✔️</b-button>
      </b-input-group-button>
    </b-input-group>
    <div v-else class="list-item-normal">
      <label @dblclick="editEnter" class="list-item-main-content">
        {{ item.text }}
      </label>
      <span class="item-rating" v-if="showRating">{{rating}}</span>
      <b-button
        v-if="removable"
        class="list-item-remove"
        variant="outline-danger"
        size="sm"
        @click="removeItem"
      >X</b-button>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    itemIndex: {
      default: -1,
      type: Number,
    },
    editable: {
      default: true,
      type: Boolean,
    },
    removable: {
      default: true,
      type: Boolean,
    },
    showRating: {
      default: true,
      type: Boolean,
    },
  },
  data: () => ({
    newValue: '',
    edit: false,
  }),
  computed: {
    item() {
      return this.$store.getters.item(this.itemIndex);
    },
    rating() {
      return this.item.rating == null ? 1000 : this.item.rating;
    },
  },
  methods: {
    removeItem() {
      this.$store.commit('removeItem', this.itemIndex);
    },
    async editEnter() {
      if (this.editable) {
        this.newValue = this.item.text;
        this.edit = true;
        await this.$nextTick();
        this.$refs['list-item-edit-input'].focus();
      }
    },
    editSave() {
      if (this.edit) {
        this.edit = false;
        if (this.newValue) {
          this.$store.commit('modifyItem', {
            id: this.itemIndex,
            value: { text: this.newValue },
          });
        } else {
          this.removeItem();
        }
      }
    },
    editCancel() {
      this.edit = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.list-item
  width: 100%
  min-height: 50px
  display: flex
  flex-direction: row
  padding: 0

.list-item-main-content
  width: 100%
  height: 100%
  text-align: left
  margin: 0

.list-item-normal
  width: 100%
  display: flex
  flex-direction: row

  label
    padding: 0.5rem 0.75rem
    border: 1px solid transparent
    overflow: hidden
    clear: both

.list-item-remove
  width: 2rem
  height: 100%
  margin: auto 0.2rem auto 0
  opacity: 0

  .list-item:hover &
    opacity: 1

.item-rating
  font-family: monospace
  font-size: 1.5rem
  color: #2BB3E0
  margin: auto 0.5rem auto 0
</style>
