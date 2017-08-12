<template>
  <div class="app-list-view">
    <add-item></add-item>
    <b-list-group id="items-list">
      <list-item
        v-for="itemIndex in sortedItems"
        :key="itemIndex"
        :itemIndex="itemIndex"
      ></list-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from '@/components/ListItem';
import AddItem from '@/components/AddItem';

export default {
  name: 'ItemView',
  components: {
    ListItem,
    AddItem,
  },
  computed: mapGetters(['sortedItems']),
};
</script>

<style lang="sass" scoped>
.app-list-view
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%

#items-list
  width: 100%
  margin-top: 12px
  min-height: 52px
  max-height: 50vh
  overflow-y: auto
  align-items: stretch
</style>
