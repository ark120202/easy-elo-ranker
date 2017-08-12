<template>
  <div class="items-voting">
    <list-item
      class="list-item"
      v-if="currentPair && currentPair[0] != null"
      :itemIndex="currentPair[0]"
      :editable="false"
      :removable="false"
      :showRating="false"
      @click.native="vote(0)"
    ></list-item>
    <div class="center">
      <label
        class="equals"
        @click="vote(-1)"
      >=</label>
    </div>
    <list-item
      class="list-item"
      v-if="currentPair && currentPair[1] != null"
      :itemIndex="currentPair[1]"
      :editable="false"
      :removable="false"
      :showRating="false"
      @click.native="vote(1)"
    ></list-item>
    <div class="aftertext">Choose the most important item</div>
  </div>
</template>

<script>
import EloRank from 'elo-rank';
import ListItem from '@/components/ListItem';

export default {
  name: 'ItemsVoting',
  components: {
    ListItem,
  },
  data: () => ({
    comparasions: [],
    results: {},
    currentPair: null,
  }),
  mounted() {
    this.comparasions = this.$store.getters.getComparisonTable();
    this.next();
  },
  methods: {
    next() {
      if (this.comparasions.length === 0) {
        this.$store.commit('setStage', 'view');
      } else {
        this.currentPair = this.comparasions.shift();
      }
    },
    vote(result) {
      if (result !== -1) {
        const upvotedIndex = this.currentPair[result];
        const downvotedIndex = this.currentPair[result === 0 ? 1 : 0];
        const elo = new EloRank();

        const upvotedResult = this.$store.getters.item(upvotedIndex).rating;
        const downvotedResult = this.$store.getters.item(downvotedIndex).rating;

        this.$store.commit('modifyItem', {
          id: upvotedIndex,
          value: {
            rating: elo.updateRating(
              elo.getExpected(upvotedResult, downvotedResult),
              1,
              upvotedResult,
            ),
          },
        });

        this.$store.commit('modifyItem', {
          id: downvotedIndex,
          value: {
            rating: elo.updateRating(
              elo.getExpected(downvotedResult, upvotedResult),
              0,
              downvotedResult,
            ),
          },
        });
      }
      this.next();
    },
  },
};
</script>

<style lang="sass" scoped>
.items-voting
  width: 100%
.list-item
  transition: all 0.2s ease-out
  &:hover
    background-color: #5EF25E
.equals
  margin: 0
  font-size: 5rem
  transition: all 0.15s ease-out
  color: #1053E3
  text-shadow: 0 0 2px #91E0FA
  user-select: none

  &:hover
    color: #5289FF
    transform: translateY(-2px)

  &:active
    color: #063599
    transform: translateY(2px)
.aftertext
  margin-top: 0.77rem
  font-family: monospace
  transition: all 0.1s ease-out
  color: #888

  &:hover
    color: #111
</style>
