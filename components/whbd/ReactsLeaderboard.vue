<template>
  <div>
    <div class="row">
      <h2 class="col-12 col-md-7 col-lg-12 col-xxl-7">Reactions:</h2>
      <div class="col-12 col-md-5 col-lg-12 col-xxl-5 pb-4 pb-xxl-0">
        <button
          type="button"
          class="btn btn-outline-secondary mt-2 active"
          data-bs-toggle="button"
          aria-pressed="true"
          autocomplete="off"
          v-on:click="toggleSpam"
          title="Toggle whether to include channels like #spam, #dev, #the-real-us, etc."
        >
          <span v-if="currentlySpam">Incl. Spam</span>
          <strike v-else>Incl. Spam</strike>
        </button>
      </div>
    </div>
    <transition-group name="lb" tag="p">
      <div v-for="emoji in active" class="row" v-bind:key="emoji[1]">
        <p class="col-6 col-md-5">
          {{ emoji[0] }}
          <img
            aria-label="emoji[1]"
            :src="map(emoji[1])"
            :title="emoji[1]"
            alt="emoji[1]"
            class="emoji"
          />
        </p>
        <p class="col-6 col-md-7">
          {{ emoji[2] }}
          <span v-if="emoji[0] == '1.'" class="subtext">uses</span>
        </p>
      </div>
    </transition-group>
    <hr />
    <br />
    <div class="row">
      <p class="col-6 col-md-5">Total:</p>
      <p class="col-6 col-md-7">{{ totalActive }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentlySpam: true,
      active: [
        ["1.", ":upvote:", "3,865"],
        ["2.", "🎲", "1,142"],
        ["3.", ":downvote:", "897"],
        ["4.", ":lfg:", "581"],
        ["5.", "👋", "377"],
      ],
      totalActive: "18,483",
      totalHidden: "13,771",
      hidden: [
        ["1.", ":upvote:", "3,379"],
        ["2.", ":downvote:", "870"],
        ["3.", ":lfg:", "526"],
        ["4.", "📌", "250"],
        ["5.", ":shredward:", "247"],
      ],
    };
  },
  methods: {
    toggleSpam() {
      temp = this.active;
      this.active = this.hidden;
      this.hidden = temp;

      this.currentlySpam = !this.currentlySpam;

      [this.totalActive, this.totalHidden] = [
        this.totalHidden,
        this.totalActive,
      ];
    },
    map(key) {
      return map[key];
    },
  },
};
// Vue.createApp(reactsLeaderboard).mount("#reactionsApp");
</script>