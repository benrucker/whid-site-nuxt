<template>
  <div class="container justify-content-center d-flex">
    <br>
    <br>
    <br>
    <component :is="window" class="mt-5 fakepage" @changeWindow="changeWindow" />
  </div>
</template>

<script>
import ScoreBoard from '@/components/score/Board.vue'
import ScorePerson from '@/components/score/Person.vue'

export default {
  components: {
    ScoreBoard,
    ScorePerson
  },
  data () {
    return {
      window: 'scoreBoard'
    }
  },
  methods: {
    changeWindow (window) {
      this.window = window
    }
  }
}
</script>

<style>
.fakepage {
    overflow: scroll;
    height: 80vh;
    border: 10px inset rgba(128, 128, 128, 0.6);
}
</style>
