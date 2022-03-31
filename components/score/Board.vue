<template>
  <div id="body" class="fake-webpage w-75">
    <div id="navbar">
      <div id="links">
        <span class="a link" href="scoreboard.html">Scoreboard</span>
        <span
          class="a"
          href="score.html"
          @click="changeWindow"
        >Your Score</span>
      </div>
      <div id="logo">
        your logo here:
        <img src="/score/whid.png" alt="google logo">
      </div>
    </div>

    <hr>
    <br>
    <br>

    <div id="body">
      <table id="scoreboard">
        <tbody v-if="!$fetchState.pending">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          <tr v-for="(score, index) in sortedScores" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="namecol text-start">
              {{ score.name }}
            </td>
            <td>{{ score.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'score',
  data () {
    return {
      scores: []
    }
  },
  async fetch () {
    this.scores = await this.getData()
  },
  computed: {
    sortedScores () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.scores.sort((a, b) => b.score - a.score)
    }
  },
  methods: {
    changeWindow () {
      this.$emit('changeWindow', 'scorePerson')
    },
    async getData () {
      const response = await fetch('https://api.whid.live/scores/named/latest')
      console.log(response)
      const data = response.ok ? await response.json() : []
      console.log(data)
      data.sort((a, b) => b.score - a.score)
      return data.map((d) => {
        return {
          name: d.name,
          score: d.score
        }
      })
    }
  }
}
</script>

<style scoped>
table#scoreboard,
table#scoreboard td,
table#scoreboard th {
  border: 1px solid #333;
}

table#scoreboard {
  width: 60%;
  border-collapse: collapse;
}

#scoreboard td,
table#scoreboard th {
  text-align: center;
}

.namecol {
  padding-left: 3em;
}
</style>
