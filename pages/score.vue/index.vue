<template>
  <div class="container-md justify-content-center d-flex score-parent">
    <br />
    <br />
    <br />
    <component
      :is="window"
      class="mt-5 fakepage"
      @changeWindow="changeWindow"
    />
  </div>
</template>

<script>
import ScoreBoard from '@/components/score/Board.vue'
import ScorePerson from '@/components/score/Person.vue'

export default {
  components: {
    ScoreBoard,
    ScorePerson,
  },
  data() {
    return {
      window: 'scoreBoard',
    }
  },
  methods: {
    changeWindow(window) {
      this.window = window
    },
  },
}
</script>
