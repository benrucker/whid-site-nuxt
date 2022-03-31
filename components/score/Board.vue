<template>
  <div class="fake-webpage w-75" id="body">
    <div id="navbar">
      <div id="links">
        <span class="a link" href="scoreboard.html">Scoreboard</span>
        <span class="a" href="score.html" v-on:click="changeWindow"
          >Your Score</span
        >
      </div>
      <div id="logo">
        your logo here:
        <img src="/score/whid.png" alt="google logo" />
      </div>
    </div>

    <hr />
    <br />
    <br />

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
            <td class="namecol text-start">{{ score.name }}</td>
            <td>{{ score.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: [],
    };
  },
  layout: 'score',
  computed: {
    sortedScores() {
      return this.scores.sort((a, b) => b.score - a.score);
    },
  },
  async fetch() {
    this.scores = await this.getData();
  },
  methods: {
    changeWindow() {
      this.$emit("changeWindow", "scorePerson");
    },
    async getData() {
      return fetch("https://api.whid.live/scores/named/latest")
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else console.log(response);
        })
        .then((data) => {
          console.log(data);
          data.sort((a, b) => b.score - a.score);
          return data.map((d) => {
            return {
              name: d.name,
              score: d.score,
            };
          });
        });
    },
  },
};
</script>

<style scoped>

table#scoreboard,
table#scoreboard td,
table#scoreboard th {
  border: 1px solid #333;
}

table#scoreboard {
  width: 80%;
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