<template>
  <div>
    <div class="row">
      <h2 class="col-12 col-md-7 col-lg-12 col-xxl-7">Combined:</h2>
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
          <span
            v-if="emoji[1] == ':trueshred:'"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-html="true"
            title=":shred: and :trueshred: are the same emoji, but this only counts :trueshred:. So there are actually more than this!"
          >
            <u>{{ emoji[2] }}</u></span
          >
          <span
            v-else-if="emoji[1] == ':upvote:'"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-html="true"
            title=":upvote: has only been sent in a message 18 times!"
          >
            <u>{{ emoji[2] }}</u></span
          >
          <span v-else>{{ emoji[2] }}</span>
          <span v-if="emoji[0] == '1.'" class="subtext"> uses</span>
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
const combinedLeaderboard = {
  data() {
    return {
      currentlySpam: true,
      active: [
        ["1.", ":upvote:", "3,883"],
        ["2.", "🎲", "1,142"],
        ["3.", ":downvote:", "906"],
        ["4.", ":lfg:", "758"],
        ["5.", ":YOOOOOO:", "488"],
      ],
      totalActive: "31,542",
      totalHidden: "18,818",
      hidden: [
        ["1.", ":upvote:", "3,393"],
        ["2.", ":downvote:", "876"],
        ["3.", ":lfg:", "693"],
        ["4.", ":YOOOOOO:", "477"],
        ["5.", ":trueshred:", "382"],
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
      setTimeout(() => {
        enableTooltips();
      }, 100);
    },
    map(key) {
      return map[key];
    },
  },
};
// Vue.createApp(combinedLeaderboard).mount("#combinedApp");
</script>