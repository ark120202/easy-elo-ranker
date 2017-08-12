<template>
  <div id="app">
    <h2>Easy Elo Ranker</h2>
    <items-voting
      v-if="isVotingStage"
      class="app-voting"
    ></items-voting>
    <items-view
      v-else
      class="app-list-view"
    ></items-view>
    <div id="buttons" v-show="!isVotingStage">
      <b-button
        id="button-start-voting"
        variant="outline-danger"
        size="lg"
        :disabled="!canClear"
        @click="clearRanks"
      >CLEAR RANKS</b-button>
      <b-button
        id="button-start-voting"
        variant="outline-primary"
        size="lg"
        :disabled="!canCompare"
        @click="startVoting"
      >START VOTING</b-button>
    </div>
    <div id="links">
      <a href="https://github.com/ark120202/easy-elo-ranker">GITHUB</a>
      <a href="https://github.com/ark120202/easy-elo-ranker/blob/master/README.md">README</a>
    </div>
  </div>
</template>

<script>
import ItemsView from '@/components/ItemsView';
import ItemsVoting from '@/components/ItemsVoting';

export default {
  name: 'App',
  components: {
    ItemsView,
    ItemsVoting,
  },
  computed: {
    isVotingStage() {
      return this.$store.state.stage === 'voting';
    },
    canClear() {
      const someItemHasRating = this.$store.state.items.some(item => item.rating !== 1000);
      return this.$store.getters.itemCount > 0 && someItemHasRating;
    },
    canCompare() {
      return this.$store.getters.itemCount > 1;
    },
  },
  methods: {
    startVoting() {
      this.$store.commit('clearItemRanks');
      this.$store.commit('setStage', 'voting');
    },
    clearRanks() {
      this.$store.commit('clearItemRanks');
    },
  },
};
</script>

<style lang="sass" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center
  color: #2c3e50
  min-width: 200px
  width: 35vw
  margin: 60px auto 0 auto

#button-start-voting
  margin-top: 0.7rem

#links
  margin-top: 1rem
  font-size: 12px
  a
    margin-left: 0.25rem
    margin-right: 0.25rem
    color: black
</style>
